const eliminarTweets = async () => {
  const botonMas = document.querySelector('[aria-label="Más opciones"]');
  if (!botonMas) {
    console.log("No se pudo encontrar el botón de 'Más opciones'. ¿Estás en tu página de perfil?");
    return;
  }

  botonMas.click();
  
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  
  const botonEliminar = [...document.querySelectorAll('div[role="menu"] div')].find(item => item.textContent === "Eliminar");
  if (!botonEliminar) {
    console.log("No se pudo encontrar la opción 'Eliminar'. ¿Está visible el menú desplegable?");
    return;
  }

  botonEliminar.click();
  
  await new Promise(resolve => setTimeout(resolve, 1000)); 
  
  const botonConfirmar = document.querySelector('[data-testid="confirmationSheetConfirm"]');
  if (!botonConfirmar) {
    console.log("No se pudo encontrar el botón 'Confirmar'. ¿Está visible el cuadro de confirmación?");
    return;
  }

  botonConfirmar.click();
};

// Repetir 20 veces
for (let i = 0; i < 20; i++) {
  eliminarTweets();
  await new Promise(resolve => setTimeout(resolve, 3000));
}
