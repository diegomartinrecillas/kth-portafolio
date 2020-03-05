import React, { useEffect, useRef, useState, CSSProperties } from "react";

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
              <h1 className="text-6xl">John Doesson</h1>
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
        <div className="container m-auto ">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
          <p className="lg:text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{" "}
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
      <PortafolioItem onSelect={() => select(0)} selected={selected === 0} />
      <PortafolioItem onSelect={() => select(1)} selected={selected === 1} />
      <PortafolioItem onSelect={() => select(2)} selected={selected === 2} />
      <PortafolioItem onSelect={() => select(3)} selected={selected === 3} />
      <PortafolioItem onSelect={() => select(4)} selected={selected === 4} />
      <PortafolioItem onSelect={() => select(5)} selected={selected === 5} />
    </div>
  );
};

interface Props {
  onSelect: () => void;
  selected: boolean;
}

const ANIMATION_DURATION = 300;

const PortafolioItem = (props: Props) => {
  const self = useRef<HTMLDivElement>(null);
  const { selected, onSelect } = props;

  const [style, setStyle] = useState<CSSProperties>({});

  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [top, setTop] = useState<number>();
  const [left, setLeft] = useState<number>();

  useEffect(() => {
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
      width: computedWidth
    });
  }, []);

  let cardClasses =
    "h-64 bg-white shadow-sm transform focus:outline-none cursor-pointer rounded-sm overflow-hidden transition-all duration-200";

  if (!selected) cardClasses += " hover:shadow-lg hover:scale-105";
  if (selected) cardClasses += " shadow-xl";

  const focus = () => {
    const gridHeight = (self.current?.offsetParent as HTMLDivElement)
      ?.offsetHeight;
    const gridWidth = (self.current?.offsetParent as HTMLDivElement)
      ?.offsetWidth;

    const scaleFactor = 6;

    setStyle({
      position: "absolute",
      height: `calc(${gridHeight}px + ${scaleFactor}rem)`,
      width: `calc(${gridWidth}px + ${scaleFactor}rem)`,
      left,
      top,
      transitionDuration: `${ANIMATION_DURATION}ms`,
      transform: `translateY(calc(-${top}px - ${scaleFactor /
        2}rem)) translateX(calc(-${left}px - ${scaleFactor / 2}rem))`,
      zIndex: 10
    });

    onSelect();
  };

  const close = () => {
    setStyle({
      ...style,
      height,
      width,
      left,
      top,
      transform: `translateY(0) translateX(0)`
    });

    setTimeout(() => {
      setStyle({
        position: "initial",
        height,
        width,
        zIndex: "initial"
      });
    }, ANIMATION_DURATION);
    onSelect();
  };

  return (
    <>
      {style.position === "absolute" && <div style={{ height, width }} />}
      <div
        style={style}
        ref={self}
        onClick={selected ? close : focus}
        tabIndex={1}
        className={cardClasses}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 h-full">
            {/* <img
              className="object-cover"
              alt="example"
              src="media/gemera.jpg"
            /> */}
          </div>
          {/* <div className="h-12 shadow-blur-gray-3 bg-gray-300"></div> */}
        </div>
      </div>
    </>
  );
};

export default App;
