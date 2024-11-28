// src/plugins/vuetify.js
import 'vuetify/styles'; // Importation des styles de Vuetify
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'; // Importation des icônes

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
});
