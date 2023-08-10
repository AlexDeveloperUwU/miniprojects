const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function isImageFile(fileName) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const ext = path.extname(fileName).toLowerCase().split('?')[0]; // Ignore query string (?cb=7693791)
  return imageExtensions.includes(ext);
}

function isYouTubeVideo(url) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

function isInstagramImage(url) {
  return url.includes('instagram.com');
}

function downloadFile(url, folder) {
  const fileName = path.basename(url).split('?')[0]; // Remove query string from file name
  const folderPath = path.join(__dirname, 'Memes', folder);

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Check if the URL is a YouTube video
  if (isYouTubeVideo(url)) {
    console.log(`Skipping YouTube video: ${url}`);
    return;
  }

  // Check if the URL is from Instagram
  if (isInstagramImage(url)) {
    console.log(`Skipping Instagram image: ${url}`);
    return;
  }

  // Download the file
  axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  })
    .then(response => {
      const filePath = path.join(folderPath, fileName);

      // Check if the file already exists
      if (fs.existsSync(filePath)) {
        console.log(`Duplicate file: ${url}`);
        return;
      }

      // Check if the file has a supported image extension
      if (isImageFile(fileName)) {
        response.data.pipe(fs.createWriteStream(filePath));
        console.log(`Image downloaded: ${url}`);
        addMemeEntry(fileName, url, folder); // Add meme entry to memes.json
      } else {
        console.log(`Skipping unsupported file: ${url}`);
      }
    })
    .catch(error => {
      console.error(`Error downloading the file: ${url}`);
      console.error(error);
    });
}

function addMemeEntry(fileName, url, folder) {
  const memesFilePath = path.join(__dirname, 'memes.json');
  const entry = { fileName, folderName: folder, url: `https://raw.githubusercontent.com/AUTOR/REPO/main/Memes/${folder}/${fileName}` };

  // Read existing entries from memes.json
  let existingEntries = [];
  if (fs.existsSync(memesFilePath)) {
    const memesData = fs.readFileSync(memesFilePath, 'utf8');
    existingEntries = JSON.parse(memesData);
  }

  // Check if the entry already exists
  const existingEntryIndex = existingEntries.findIndex(
    entry => entry.fileName === fileName && entry.folderName === folder
  );
  if (existingEntryIndex !== -1) {
    console.log(`Entry already exists in memes.json: ${fileName}`);
    return;
  }

  // Add the new entry
  existingEntries.push(entry);

  // Write the updated entries to memes.json
  fs.writeFileSync(memesFilePath, JSON.stringify(existingEntries, null, 2));
  console.log(`Meme entry added to memes.json: ${fileName}`);
}

function scrapeMemes() {
  const subreddits = ['MemesEnEspanol', 'memessanos', 'BeelcitosMemes', 'MemesESP', 'SpanishMeme', 'ShitpostES', 'Aespanol', 'SpainMeme', 'ShitpostHispano', 'SpanishLibMemes', 'memewordES'];

  subreddits.forEach(subreddit => {
    axios
      .get(`https://www.reddit.com/r/${subreddit}/.json`)
      .then(response => {
        const data = response.data;
        if (data && data.data && data.data.children) {
          const posts = data.data.children;
          posts.forEach(post => {
            const image = post.data.url_overridden_by_dest;
            if (image && image.startsWith('http') && !post.data.is_gallery) {
              // Save the image in the corresponding subreddit folder
              downloadFile(image, subreddit);
            }
          });
        }
      })
      .catch(error => {
        console.error(`Error getting memes from subreddit ${subreddit}`);
        console.error(error);
      });
  });
}

// Create the "Memes" folder if it doesn't exist
const memesFolderPath = path.join(__dirname, 'Memes');
if (!fs.existsSync(memesFolderPath)) {
  fs.mkdirSync(memesFolderPath);
}

// Call the scraping function
scrapeMemes();
