import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { Project, PROJECTS } from "./portafolio";

const App = () => {
  return (
    <div className="w-full">
      <div className="h-screen">
        <div className="h-full grid grid-cols-1 lg:grid-cols-layout-left">
          <div className="flex flex-col">
            <div className="px-12 pt-24 pb-12">
              <div className="text-xl font-bold text-gray-600 uppercase">
                Hello. I am
              </div>
              <h1 className="text-6xl">Diego Martin</h1>
            </div>
          </div>
          <div className="flex bg-gray-900">
            <div className="self-end text-right w-full p-12">
              <p className="text-xl font-light text-gray-100">
                An{" "}
                <a
                  className="underline hover:text-gray-500"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.kth.se/en/studies/master/interactivemediatechnology/description-1.593765"
                >
                  Interactive Media Technology
                </a>{" "}
                master's student at KTH Royal Institute of Technology in{" "}
                <span className="font-bold">Stockholm, Sweden</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen py-12 px-6 bg-gray-400">
        <div className="container m-auto">
          <div className="mt-6 mb-4">
            <h2 className="text-gray-700 font-bold text-xl">PORTAFOLIO</h2>
          </div>
          <Portafolio />
        </div>
      </div>
      <div className="min-h-screen py-12 px-6 bg-gray-900 text-gray-100 flex flex-col">
        <div className="flex-1 container m-auto flex flex-col h-full">
          <div className="flex-1 flex flex-col lg:flex-row">
            <div className="lg:flex-1 lg:px-12 pt-24 pb-12">
              <p className="text-xl font-bold uppercase">About</p>
              <p className="text-5xl text-gray-500">Me</p>
            </div>
            <div className="flex-1 lg:flex-none lg:w-gold lg:pt-24 pb-12">
              <p>
                I'm a Software Developer with a demonstrated history of working
                in the computer software industry. Skilled in Web Development
                and Architecture, UX and Interaction Design.
              </p>
              <p className="mt-4">
                A strong engineering professional and, currently, a Master's
                Student at KTH Royal Institute of Technology.
              </p>
            </div>
          </div>
          <p className="lg:text-center text-gray-500 text-sm">
            Diego Martin © 2020
          </p>
        </div>
      </div>
    </div>
  );
};

const Portafolio = () => {
  const [selected, setSelected] = useState(-1);

  const select = (id: number) =>
    selected === id ? setSelected(-1) : setSelected(id);

  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
      {PROJECTS.map((item, index) => (
        <PortafolioItem
          key={index}
          project={item}
          onSelect={() => select(index)}
          selected={selected === index}
        />
      ))}
    </div>
  );
};

interface Props {
  onSelect: () => void;
  selected: boolean;
  project: Project;
}

const ANIMATION_DURATION = 300;

const PortafolioItem = (props: Props) => {
  const self = useRef<HTMLDivElement>(null);
  const { selected, onSelect, project } = props;

  const [style, setStyle] = useState<CSSProperties>({});

  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [top, setTop] = useState<number>();
  const [left, setLeft] = useState<number>();

  useEffect(() => computeDimensions(), []);

  useEffect(() => {
    let timeoutId: any = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setStyle({});
        computeDimensions();
      }, 100);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  const computeDimensions = () => {
    const computedHeight = self.current?.offsetHeight;
    const computedWidth = self.current?.offsetWidth;
    const computedLeft = self.current?.offsetLeft;
    const computedTop = self.current?.offsetTop;

    setHeight(computedHeight);
    setWidth(computedWidth);
    setLeft(computedLeft);
    setTop(computedTop);

    setStyle({
      height: computedHeight,
      width: computedWidth,
      top: computedTop,
      left: computedLeft,
      position: "absolute",
    });
  };

  let cardClasses =
    "h-64 bg-white transform focus:outline-none cursor-pointer rounded-sm overflow-hidden transition-all duration-200";

  if (!selected) cardClasses += " hover:shadow-lg hover:scale-105";
  else cardClasses += " shadow-xl";

  const focus = () => {
    const gridHeight = (self.current?.offsetParent as HTMLDivElement)
      ?.offsetHeight;
    const gridWidth = (self.current?.offsetParent as HTMLDivElement)
      ?.offsetWidth;

    const EXTRA_REMs = 6;

    setStyle({
      ...style,
      position: "absolute",
      height: `calc(${gridHeight}px + ${EXTRA_REMs}rem)`,
      width: `calc(${gridWidth}px + ${EXTRA_REMs}rem)`,
      transitionDuration: `${ANIMATION_DURATION}ms`,
      transform: `translateY(calc(-${top}px - ${
        EXTRA_REMs / 2
      }rem)) translateX(calc(-${left}px - ${EXTRA_REMs / 2}rem))`,
      zIndex: 10,
    });

    onSelect();
  };

  const close = () => {
    setStyle({
      ...style,
      height,
      width,
      transform: "none",
      zIndex: 1,
    });

    let timeoutId: any = null;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setStyle({
        height,
        width,
        top,
        left,
      });
    }, ANIMATION_DURATION);
    onSelect();
  };

  return (
    <>
      {style.position === "absolute" && <div style={{ height, width }} />}
      <div style={style} ref={self} tabIndex={1} className={cardClasses}>
        {/* <div className="flex flex-col h-full">
          <div className="flex-1 h-full"> */}
        <img
          className="object-cover"
          src={project.imageUri}
          alt={project.imageDescription}
        />
        {/* </div>
        </div> */}
      </div>
    </>
  );
};

export default App;
