# Total pressure calculation
Given the molecular mass of two molecules `$M_1$` and `$M_2$`, their masses present `$m_1$` and `$m_2$` in a vessel of volume `$V$` at a specific temperature `$T$`, find the total pressure `$P_{total}$` exerted by the molecules. Formula to calculate the pressure is: 

```math
\LARGE P_{total} = {{({{m_1} \over {M_1}} + {{m_2} \over {M_2}}) R T} \over V}
```

### Input

Six values : 
 - `$M_1$`, `$M_2$`: molar masses of both gases, in  `$\ g \cdot mol^{-1}$`
 - `$m_1$` and `$m_2$`: present mass of both gases, in grams (`$g$`)
 - `$V$`: volume of the vessel, in `$\ dm^3$`
 - `$T$`: temperature, in `$\ \degree C$`


### Output

One value: `$P_{total}$`, in units of `$atm$`.

### Notes

Remember: Temperature is given in Celsius while SI unit is Kelvin (`$K$`). `$\ 0\degree C = 273.15K$`

The gas constant `$\ R = 0.082dm^3 \cdot atm \cdot K^{-1} \cdot mol^{-1}$`

## Información del Kata realizado:
Creado por: FiveCrayFish973

Publicado el: 23/8/2018

URL: [Haz click aquí para ir al Kata](https://www.codewars.com/kata/5b7ea71db90cc0f17c000a5a)