import muForm from './src/mu-form'
import muFormFrame from './src/mu-form-frame'
import muFormText from './src/mu-form-text'
import muFormTextarea from './src/mu-form-textarea'
import muFormSelect from './src/mu-form-select'
import muFormRadio from './src/mu-form-radio'
import muFormCheckbox from './src/mu-form-checkbox'

muForm.install = function (Vue) {
    Vue.component(muForm.name, muForm)
}
muFormFrame.install = function (Vue) {
    Vue.component(muFormFrame.name, muFormFrame)
}
muFormText.install = function (Vue) {
    Vue.component(muFormText.name, muFormText)
}
muFormTextarea.install = function (Vue) {
    Vue.component(muFormTextarea.name, muFormTextarea)
}
muFormSelect.install = function (Vue) {
    Vue.component(muFormSelect.name, muFormSelect)
}
muFormRadio.install = function (Vue) {
    Vue.component(muFormRadio.name, muFormRadio)
}
muFormCheckbox.install = function (Vue) {
    Vue.component(muFormCheckbox.name, muFormCheckbox)
}

export {
    muForm,
    muFormFrame,
    muFormText,
    muFormTextarea,
    muFormSelect,
    muFormRadio,
    muFormCheckbox
}
