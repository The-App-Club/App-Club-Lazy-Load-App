function loadImageDom(publicURL) {
  return new Promise((resolve, reject) => {
    const imageDom = new Image();
    imageDom.crossOrigin = 'anonymous';
    imageDom.onload = (event) => {
      resolve({
        imageDom: imageDom,
        imageDomWidth: imageDom.width,
        imageDomHeight: imageDom.height,
        imageURL: publicURL,
      });
    };
    imageDom.onerror = (event) => {
      reject(event);
    };
    imageDom.src = publicURL;
  });
}

const detectInteraction = async (observedEntryInfoList) => {
  for (let index = 0; index < observedEntryInfoList.length; index++) {
    const observedEntryInfo = observedEntryInfoList[index];
    if (observedEntryInfo.isIntersecting) {
      const lazyLoadDom = observedEntryInfo.target;
      try {
        const {imageURL, imageDom, imageDomWidth, imageDomHeight} =
          await loadImageDom(lazyLoadDom.dataset.loadUrl);
        console.log(
          'imageURL, imageDom, imageDomWidth, imageDomHeight',
          imageURL,
          imageDom,
          imageDomWidth,
          imageDomHeight
        );
        setTimeout(() => {
          lazyLoadDom.src = lazyLoadDom.dataset.loadUrl;
          lazyLoadDom.parentElement.classList.remove('load-wating');
          lazyLoadDom.parentElement.classList.remove('load-lazy');
          lazyLoadObserver.unobserve(lazyLoadDom);
        }, 500);
      } catch (error) {
        setTimeout(() => {
          lazyLoadDom.classList.add('load-error');
          lazyLoadDom.parentElement.classList.remove('load-wating');
          lazyLoadDom.parentElement.classList.remove('load-lazy');
          lazyLoadObserver.unobserve(lazyLoadDom);
        }, 500);
      }
    }
  }
};

const lazyLoadObserver = new IntersectionObserver(detectInteraction);
const lazyLoadDomList = [...document.querySelectorAll('section.load-lazy')];
for (let index = 0; index < lazyLoadDomList.length; index++) {
  const lazyLoadDom = lazyLoadDomList[index];
  lazyLoadObserver.observe(lazyLoadDom.firstElementChild);
}
