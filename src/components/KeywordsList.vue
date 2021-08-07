<template>
  <div>
    <br/>
    <div class="container center">
      <b>Keywords</b> are used to insert <b>dynamic content</b> into a day. You can write a scope into your day and it will be replaced with its value
    </div>
    <br/><br/>
    <table style="width:100%">
      <thead>
      <tr>
        <th>scope</th>
        <th>replace</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="keyword in this.keywords" :key="keyword.scope">
        <td><b>{{`\u007B\u007B${keyword.scope}\u007D\u007D`}}</b></td>
        <td>{{keyword.replace}} <span v-for="color in findColor(keyword.replace)" :key="color"><span class="colorPreview" :style="{ backgroundColor: color }"></span></span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "KeywordsList",

  props: ["keywords"],

  methods: {
    findColor(string){
      try {
        let colors = string.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)|(^(?:[0-9a-fA-F]{3}){1,2}$)/g)
        if(colors) colors = colors.map((c) =>  c.match(/^([0-9a-fA-F]{3}){1,2}$/g) ? `#${c}` : c)
        return colors;
      }
      catch (e) {
        return null
      }
    }
  }

}
</script>

<style scoped>

</style>