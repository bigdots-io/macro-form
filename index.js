var Typewriter = require('typewriter');

class MacroForm {
  constructor($el, macro, config) {
    this.$el = $el;
    this.macro = macro;
    this.config = config;
  }

  render() {
    this.$el.html(`
      <div class="row">
        <div class="col-xs-12">
          <div class="macro-fields"></div>
        </div>
      </div>
    `);

    var $fields = this.$el.find('.macro-fields');

    if(this.config.fields) {
      this.config.fields.forEach((field) => {
        var inputHtml = this.generateInputField(field),
            helpTextHtml;

        if(field.helpText) {
          helpTextHtml = `<small class="text-muted">${field.helpText}</small>`;
        }
        $fields.append(`
          <fieldset class="form-group">
            <label for="${this.macro}-${field.name}">${field.label}</label>
            ${inputHtml}
            ${helpTextHtml || ""}
          </fieldset>
          `)
      });
    }
  }

  generateInputField(field) {
    if(field.input === 'color') {
      return `
        <div class="input-group colorpicker-component">
          <input type="text" id="${this.macro}-${field.name}" value="#006e91" class="form-control" />
          <span class="input-group-addon"><i></i></span>
        </div>
      `

    } else if(field.input === 'text') {
      return `
        <input type="text" id="${this.macro}-${field.name}" placeholder="${field.placeholder || ''}" class="form-control" />
      `

    } else if(field.input === 'select') {
      var options = field.options.map(function(option) {
        return `<option value="${option.value}">${option.label}</option>`
      });

      return `
        <select id="${this.macro}-${field.name}" class="form-control">
          ${options}
        </select>
      `

    } else if(field.input === 'fontSelect') {
      var options = Typewriter.availableFonts().map(function(font) {
        return `<option value="${font}">${font}</option>`
      });

      return `
        <select id="${this.macro}-${field.name}" class="form-control">
          ${options}
        </select>
      `

    } else {
      return "NOTSUPPORTED"
    }
  }

  serialData() {
    var out = {};
    if(this.config.fields) {
      this.config.fields.forEach((field) => {
        out[field.name] = $(`#${this.macro}-${field.name}`).val()
      });
    }

    return out;
  }
}

module.exports = MacroForm;
