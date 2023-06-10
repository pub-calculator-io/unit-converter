function calculate(){
  
  // 1. init & validate
  const fromValue = input.get('from_value').number().val();
  if(!input.valid()) return;

  // 2. calculate
  const fromUnit = LIST_OF_UNITS[UNITS_GROUP].find(unit => unit[0] == FROM_UNIT);
  const toUnit = LIST_OF_UNITS[UNITS_GROUP].find(unit => unit[0] == TO_UNIT);
  let from = fromUnit[2];
  let to = toUnit[2];
  let toValue; 

  if(from.indexOf('x') != -1 && to.indexOf('x') != -1){
    to = toUnit[3];
    toValue = math.evaluate(to, {x: math.evaluate(from, {x: fromValue})}); // formulas
  } else {
    if(fromUnit[3] && toUnit[3]){
      const re = /(.*\d)(in|oz|mo|tsp|imp\.tsp).*$/;
      const fromMatch = fromUnit[3].match(re)||[];
      const toMatch = toUnit[3].match(re)||[];
      if(fromMatch[2] == toMatch[2]){
        from = fromMatch[1];
        to = toMatch[1];
      }
    }
    toValue = math.evaluate(`${fromValue}*(${from})/(${to})`); // coeffs.
  }

  // 3. output
  _('to_value').value = math.format(toValue, {notation:'fixed'});
  _('result').innerHTML = `${fromValue} ${FROM_UNIT} = ${toValue} ${TO_UNIT}`;
  
}

/**
 * NOTE: 
 * Sample usage for BigNumbers - they can be set globally or used locally.
 * For local usage wrap number/string in `math.bignumber(...)` and use math.add/subtract/multiply/divide/.../evaluate.
 * Also precision can be specified - `precision: 1000`.
 * Bigger precision's value can throw error or slowdown initialization/calculation. 
 * `window.addEventListener('load', () => math.config({number:'BigNumber', precision: 9}))`
 */
 window.addEventListener('load', () => math.config({number:'BigNumber', precision: 9}));
