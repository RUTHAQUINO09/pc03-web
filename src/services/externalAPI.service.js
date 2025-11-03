import axios from 'axios';

export const getRandomImage = async () => {
  try {
    // Usamos 'picsum.photos' para obtener una imagen aleatoria
    // Redirige automáticamente a una URL de imagen estática
    const response = await axios.get('https://picsum.photos/400/400', {
      maxRedirects: 5 // Permitir redirecciones
    });
    
    // La URL final de la imagen está en 'request.res.responseUrl' después de la redirección
    return response.request.res.responseUrl || 'https://via.placeholder.com/400?text=La+Dulce+Miga';

  } catch (error) {
    console.error('Error obteniendo imagen aleatoria:', error.message);
    // Fallback por si Picsum falla
    return 'https://via.placeholder.com/400?text=La+Dulce+Miga';
  }
};