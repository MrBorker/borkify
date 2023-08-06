import { Range, getTrackBackground } from "react-range";

function FilterRange({ min, max, step, values, setValues, colors, unit }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={+step}
        min={+min}
        max={+max}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "10px",
                width: "100%",
                borderRadius: "20px",
                background: getTrackBackground({
                  values,
                  colors: colors,
                  min: +min,
                  max: +max,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              borderRadius: "50%",
              height: "20px",
              width: "20px",
              backgroundColor: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--color-rose-800"),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-35px",
                right: "-67px",
                fontWeight: "600",
                color: getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--color-rose-800"),
                fontSize: "20px",
                padding: "4px",
                width: "100px",
              }}
            >
              {values[index].toFixed(0)} {unit}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export { FilterRange };
