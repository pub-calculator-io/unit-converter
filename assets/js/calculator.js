function calculate(){
  
  // 1. init & validate
  const fromValue = input.get('from_value').number().val();
  if(!input.valid()) return;

  // 2. calculate
  const from = LIST_OF_UNITS[UNITS_GROUP].find(unit => unit[0] == FROM_UNIT);
  const to = LIST_OF_UNITS[UNITS_GROUP].find(unit => unit[0] == TO_UNIT);
  if(!to) return;
  let fromCoeff = from[2];
  let toCoeff = to[2];
  let toValue; 

  if(fromCoeff.indexOf('x') != -1 && toCoeff.indexOf('x') != -1){
    // formulas
    toCoeff = to[3];
    toValue = math.evaluate(toCoeff, {x: math.evaluate(fromCoeff, {x: fromValue})});
  } else {
    if(from[3] && to[3]){
      // alternative coeffs. (for conversion between similar measurement systems: SI/Imperial/US)
      const re = /(.*\d)(in|oz|mo|tsp|imp\.tsp).*$/;
      const fromMatch = from[3].match(re)||[];
      const toMatch = to[3].match(re)||[];
      if(fromMatch[2] == toMatch[2]){
        fromCoeff = fromMatch[1];
        toCoeff = toMatch[1];
      }
    }
    // coeffs.
    toValue = math.evaluate(`${fromValue}*(${fromCoeff})/(${toCoeff})`);
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
