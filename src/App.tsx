import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

export default function Scroll() {

  const panelsContainer = useRef();
  const menu = useRef()

  const panels = [
    { title: 'Panel 1', subtitle: 'Subtitle 1', href: "#intro" },
    {
      title: 'Panel 2', subtitle: 'Subtitle 2', href: "#panel2", horizontal: [
        { title: 'H1', subtitle: 'Horizontal 1' },
        { title: 'H2', subtitle: 'Horizontal 2' },
        { title: 'H3', subtitle: 'Horizontal 3' },
        { title: 'H4', subtitle: 'Horizontal 4' },
        { title: 'H5', subtitle: 'Horizontal 5' },
      ]
    },
    { title: 'Panel 3', subtitle: 'Subtitle 3', href: "#panel3" },
    { title: 'Panel 6', subtitle: 'Subtitle 3', href: "#panel6" },]
  // {
  //   title: 'Panel 4', subtitle: 'Subtitle 4', href: "#panel4", horizontal: [
  //     { title: 'H1', subtitle: 'Horizontal 1' },
  //     { title: 'H2', subtitle: 'Horizontal 2' },
  //     { title: 'H3', subtitle: 'Horizontal 3' },
  //     { title: 'H4', subtitle: 'Horizontal 4' },
  //     { title: 'H5', subtitle: 'Horizontal 5' },
  //   ]
  // },
  //   { title: 'Panel 5', subtitle: 'Subtitle 5', href: "#panel4" },
  // ];

  useGSAP(
    () => {
      console.log('yoooo')

      /* Main navigation */
      let panelsContainer = document.querySelector("#panels-container");

      let scrollFunc = ScrollTrigger.getScrollFunc(window);

      // document.querySelectorAll(".anchor").forEach(anchor => {
      //   anchor.addEventListener("click", function (e) {
      //     e.preventDefault();
      //     let targetElem = document.querySelector(e.target.getAttribute("href")),
      //       y = targetElem;
      //     if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
      //       let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
      //         totalMovement = (panels.length - 1) * targetElem.offsetWidth;
      //       y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
      //     }
      //     gsap.to(window, {
      //       scrollTo: {
      //         y: y,
      //         autoKill: false
      //       },
      //       onStart: () => scrollFunc.cacheID = Math.random(),
      //       onUpdate: ScrollTrigger.update,
      //       duration: 1
      //     });
      //   });
      // });

      /* Panels */
      const horizontalContainers = gsap.utils.toArray(".horizontal-container");
      horizontalContainers.forEach((container) => {
        const panels = gsap.utils.toArray(".horizontal-panel", container)
        const totalPanels = panels.length;

        // gsap.to(panels, {
        //   xPercent: -100 * (totalPanels - 1),
        //   scrollTrigger: {
        //     trigger: container,
        //     pin: true,
        //     scrub: 1,
        //     end: () => "+=" + (container.offsetWidth - innerWidth),
        //     pinSpacing: container.offsetWidth,
        //     markers: true
        //   }
        // });

        // // Add the horizontal scroll animation to the timeline
        // tl.to(container, {
        //   xPercent: () => -100 * (totalPanels), // Adjusted xPercent value
        //   ease: "none",
        //   marker: true,
        // });

        // // Add snap points
        // ScrollTrigger.create({
        //   trigger: container,
        //   start: "top top",
        //   end: () => `+=${window.innerHeight * totalPanels}`,
        //   snap: {
        //     snapTo: 1 / (totalPanels - 1),
        //     inertia: false,
        //     duration: { min: 0.1, max: 0.1 }
        //   }
        // });
      });

    }, { scope: panelsContainer }
  )

  return (
    <div>
      <nav id="anchor-nav" ref={menu}>
        {panels.map((panel, index) => (
          <a href={panel.href} key={panel.title} className="anchor">
            {panel.title}
          </a>
        ))}
      </nav>
      <div id="panels-container" ref={panelsContainer}>
        {panels.map((panel, index) => (
          <section key={index} className="panel flex-center column" id={panel.href.substring(1)}>
            {!panel.horizontal && (
              <div className="content">
                <h1>{panel.title}</h1>
                <h2>{panel.subtitle}</h2>
              </div>
            )}
            {panel.horizontal && (
              <div className="horizontal-container" style={{ width: `${100 * panel.horizontal.length}%`}}>
                {panel.horizontal?.map((hPanel, hIndex) => (
                  <article key={hIndex} className="horizontal-panel panel flex-center column">
                    <div className="content">
                      <h3>{hPanel.title}</h3>
                      <h4>{hPanel.subtitle}</h4>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

        ))}
      </div>
    </div>
  );
}