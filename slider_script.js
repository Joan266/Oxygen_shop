async function generateImages() {
  // Clear previous imageArray storage
  localStorage.removeItem("imageArray");

  const imageArray = [];
  let imgId = Math.floor(Math.random() * 1000);

  for (let i = imgId; i < imgId + 5; i++) {
    const images = await generateImageResources(i);
    imageArray.push(images);
  }

  // Store image array in local storage
  localStorage.setItem("imageArray", JSON.stringify(imageArray));
}

async function generateImageResources(imgId) {
  // Generate image URLs
  const desktopUrl = `https://picsum.photos/id/${imgId}/800/600.webp`;
  const mobileUrl = `https://picsum.photos/id/${imgId}/400/300.webp`;

  const responseDesktop = await fetch(desktopUrl);
  const responseMobile = await fetch(mobileUrl);
  
  const blobDesktop = await responseDesktop.blob();
  const blobMobile = await responseMobile.blob();
  
  const base64dataDesktop = await convertToBase64(blobDesktop);
  const base64dataMobile = await convertToBase64(blobMobile);

  return { computer: base64dataDesktop, mobile: base64dataMobile };
}

async function convertToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
  });
}

// Call the function to generate images
generateImages();
