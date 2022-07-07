function loadVideoDom(publicURL) {
  return new Promise((resolve, reject) => {
    const videoDom = document.createElement('video');
    videoDom.onloadedmetadata = (event) => {
      resolve({
        videoDom: videoDom,
        duration: videoDom.duration,
        videoDomWidth: videoDom.videoWidth,
        videoDomHeight: videoDom.videoHeight,
        videoURL: publicURL,
      });
    };
    videoDom.onerror = (event) => {
      reject(event);
    };
    videoDom.src = publicURL;
  });
}

const detectInteraction = async (observedEntryInfoList) => {
  for (let index = 0; index < observedEntryInfoList.length; index++) {
    const observedEntryInfo = observedEntryInfoList[index];
    if (observedEntryInfo.isIntersecting) {
      const lazyLoadDom = observedEntryInfo.target;
      try {
        const {videoURL, duration, videoDom, videoDomWidth, videoDomHeight} =
          await loadVideoDom(lazyLoadDom.dataset.loadUrl);
        console.log(
          'videoURL, duration, videoDom, videoDomWidth, videoDomHeight',
          videoURL,
          duration,
          videoDom,
          videoDomWidth,
          videoDomHeight
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
