export default function buildPreviewCardIntersectionObserver(cardRef, state) {
  function buildThresholdList() {
    let thresholds = [0, 1];
    let numSteps = 10000;

    for (let i = 1; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }

  const screenWidth = window.innerWidth;
  const cardWidth = cardRef.current.offsetWidth;
  const cardOffsetLeft = cardRef.current.offsetLeft;

  const marginRight = screenWidth - cardWidth - cardOffsetLeft;
  console.log("H", screenWidth, cardWidth, cardOffsetLeft);
  let options = {
    root: document.querySelector("#__next"),
    rootMargin: `0px -${marginRight}px 0px -${cardOffsetLeft}px`,
    threshold: buildThresholdList(),
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      //   console.log(screenWidth, cardWidth, cardOffsetLeft);
      console.log(entry, entry.intersectionRect);
      state({
        entry: entry,
        width: entry.intersectionRect.width,
        leftPosition: entry.boundingClientRect.left,
      });
    });
  };
  let observer = new IntersectionObserver(callback, options);

  let target = document.querySelector(".artist");
  observer.observe(target);
}
