// 1. Definimos las traducciones (Simulando archivos JSON)
const resources = {
  en: {
    translation: {
      hero: {
        title: "Discover your next adventure",
        subtitle: "Best destinations at the best price.",
        cta: "Book Now"
      },
      user: {
        welcome: "Hello, {{name}}!", // Interpolación
        messages_one: "You have one unread message.", // Singular
        messages_other: "You have {{count}} unread messages." // Plural
      }
    }
  },
  es: {
    translation: {
      hero: {
        title: "Descubre tu próxima aventura",
        subtitle: "Los mejores destinos al mejor precio.",
        cta: "Reservar ahora"
      },
      user: {
        welcome: "¡Hola, {{name}}!",
        messages_one: "Tienes un mensaje sin leer.",
        messages_other: "Tienes {{count}} mensajes sin leer."
      }
    }
  },
  ar: { // Agregado para probar RTL (Árabe)
    translation: {
      hero: {
        title: "اكتشف مغامرتك القادمة",
        subtitle: "أفضل الوجهات بأفضل الأسعار.",
        cta: "احجز الآن"
      },
      user: {
        welcome: "مرحباً {{name}}!",
        messages_one: "لديك رسالة واحدة غير مقروءة.",
        messages_other: "لديك {{count}} رسائل غير مقروءة."
      }
    }
  }
};

// Estado simulado del usuario
let userState = {
    name: "Ana",
    messages: 2
};

// 2. Inicializar i18next
i18next.init({
  lng: 'es', // Idioma por defecto
  debug: true,
  resources: resources
}, function(err, t) {
  if (err) return console.error(err);
  // Una vez inicializado, actualizamos el contenido
  updateContent();
});

// 3. Función principal para actualizar textos en el DOM
function updateContent() {
    // A. Actualizar textos estáticos (buscando por atributo data-i18n)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = i18next.t(key);
    });

    // B. Actualizar textos con Interpolación (Bienvenida)
    document.getElementById('user-welcome').innerHTML = i18next.t('user.welcome', { name: userState.name });

    // C. Actualizar textos con Pluralización (Mensajes)
    document.getElementById('msg-count').innerHTML = i18next.t('user.messages', { count: userState.messages });
    
    // D. Manejo de RTL (Dirección de lectura)
    updateDirection();
}

// 4. Función para cambiar idioma (Vinculada a los botones)
function changeLanguage(lng) {
    i18next.changeLanguage(lng, () => {
        updateContent();
    });
}

// 5. Utilidad para cambiar dirección (LTR vs RTL) según idioma
function updateDirection() {
    const currentLng = i18next.language;
    const dir = i18next.dir(currentLng); // i18next detecta si es 'rtl' o 'ltr'
    document.documentElement.dir = dir; // Aplicamos al tag <html>
    document.documentElement.lang = currentLng;
}

// 6. Simulación de cambio de datos (para probar plurales)
function updateMsgCount(count) {
    userState.messages = count;
    updateContent();
}

