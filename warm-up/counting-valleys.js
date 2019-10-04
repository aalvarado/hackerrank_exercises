const countingValleys = (n, s) => {
  let valleys = 0;
  let previousLevel = 0;
  let currentLevel = 0;

  for (const ch of s){
    previousLevel = currentLevel;

    switch(ch){
      case 'U':
        currentLevel++;
        break;

      case 'D':
        currentLevel--;
        break;
    }

    if (previousLevel == -1 && currentLevel == 0){
      valleys++;
    }        
  }

  return valleys;
};
