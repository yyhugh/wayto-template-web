module.exports = {
  presets: [
    [
      '@vue/app'<%_ if (options.surportIE) { _%>,
      {
        useBuiltIns: 'entry'
      }
      <%_ } %>
    ]
  ]
}
