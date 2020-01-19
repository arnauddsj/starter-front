<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
:root {
  --white: white;
  --red: red;
  --blue: #296eee;
  --grey1: #f4f4f4;
  --grey2: #bebebe;
  --grey3: #636363;
  --grey4: #212529;
  --greyaccent: #e6e8eb;
  --shadowgrey: rgba(0, 0, 0, 0.15);
  --cardshadow: 0px 4px 8px var(--shadowgrey);
  --rowborder: 2px solid var(--blue);
}
html {
  box-sizing: border-box;
  font-size: 62.5%; // 10px/16px = 62.5% -> 1rem = 10px
}
body {
  //GENERAL RESET STYLING
  * > button {
    background-color: inherit;
    border: 0;
    line-height: normal;
    &:hover {
      cursor: pointer;
    }
  }
  * > li {
    list-style: none;
  }
  a,
  a:visited,
  a:active {
    color: currentColor;
    text-decoration: none;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.6rem;
}
</style>
