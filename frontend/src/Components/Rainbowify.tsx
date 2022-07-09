import React, { useEffect, useState } from "react";

const COLOR_RANGE = [90, 200];
const FREQ = 400;

interface Props {
    children: string;
}

const Rainbowify = ({ children }: Props) => {
    const [color, setColor] = useState<Array<number>>([
        COLOR_RANGE[0],
        COLOR_RANGE[0],
        COLOR_RANGE[1],
    ]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const shifty = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000 / FREQ));
            const increasing = index,
                decreasing = (index + 2) % 3;
            const new_color = [...color];
            new_color[increasing]++;
            new_color[decreasing]--;
            if (new_color[increasing] === COLOR_RANGE[1])
                setIndex((index + 1) % 3);
            setColor(new_color);
        };

        shifty();
    }, [color, index]);

    return (
        <p style={{ color: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}>
            {children}
        </p>
    );
};

export default Rainbowify;
