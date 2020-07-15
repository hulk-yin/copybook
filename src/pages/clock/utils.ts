
interface IdrawCalibrationProps {
    radius: number
    parts: 12 | 24 | 60 | 120
    size: [number, number, number?]
    textOffset?: number
}
const getRadian = (parts: number, count: number,) => -(2 * Math.PI / 360) * ((360 / parts * count + 180) % 360)

const drawClockCalibration = (ctx: CanvasRenderingContext2D, props: IdrawCalibrationProps) => {
    const { radius, parts, size: [inner, outer, size = 1], textOffset } = props
    // 绘制时刻度
    let x: number;
    let y: number;
    ctx.beginPath();
    for (let i = 0; i < parts; i++) {
        const radian = getRadian(parts, i)
        x = Math.sin(radian) * (radius + inner);
        y = Math.cos(radian) * (radius + inner);
        ctx.moveTo(x, y);
        x = Math.sin(radian) * (radius + outer);
        y = Math.cos(radian) * (radius + outer);
        ctx.lineTo(x, y);
        if (size) {
            ctx.lineWidth = size
        }
        if (textOffset) {
            x = Math.sin(radian) * (radius + outer + textOffset);
            y = Math.cos(radian) * (radius + outer + textOffset);
            if (parts === 60) {
                if (i % 5 === 0) {
                    ctx.fillText((i || parts).toString(), x, y)
                }
            } else {
                ctx.fillText((i || parts).toString(), x, y)
            }
        }
    }
    ctx.stroke();
}
export const drawClockBlank = (ctx: CanvasRenderingContext2D, props: { radius: number }) => {
    drawClockCalibration(ctx, {
        radius: props.radius,
        parts: 24,
        size: [-18, -12, 3],
        textOffset: -20
    })
    drawClockCalibration(ctx, {
        radius: props.radius,
        parts: 60,
        size: [-4, 0],
        textOffset: 20
    })
}
interface IdrawClockOnePointerProps {
    radius: number
    parts: number
    postion: number
    offset?: {
        start?: number
        end?: number
    }
    lineWidth?: number
}
const drawClockOnePointer = (ctx: CanvasRenderingContext2D, props: IdrawClockOnePointerProps) => {

    const { radius, parts, postion, offset = {}, lineWidth = 1 } = props
    const { start = 0, end = 0 } = offset
    let x, y;
    ctx.beginPath();
    const radian = getRadian(parts, postion)
    x = Math.sin(radian) * (radius + start);
    y = Math.cos(radian) * (radius + start);
    ctx.moveTo(x, y);
    x = Math.sin(radian) * (radius + end);
    y = Math.cos(radian) * (radius + end);
    ctx.lineTo(x, y);
    ctx.lineWidth = lineWidth
    ctx.stroke()
}
export const drawSector = (ctx: CanvasRenderingContext2D, props: {
    radius: number
    start: number
    end: number,
    imgUrl?: string,
    color?: string,
    label?: string
}) => {
    const { radius } = props
    ctx.beginPath()
    ctx.fillStyle = ""

    if (props.color) {
        ctx.fillStyle = props.color
    }


    ctx.scale(1, 1)
    ctx.moveTo(0, 0);
    const start = (props.start ? Math.PI * 2 / props.start : 0) - (Math.PI * 2 / 360 * 90)
    const end = (props.end ? Math.PI * 2 / props.end : 0) - Math.PI * 2 / 360 * 90
    ctx.arc(0, 0, radius, start, end, false)
    ctx.closePath();
    ctx.fill()

    if (props.imgUrl) {
        var img = document.getElementById(props.imgUrl) as HTMLImageElement;
        if (!img) {
            img = document.createElement("img");
            img.src = props.imgUrl
            img.id = props.imgUrl || "";
            (document.getElementById("img-container") as HTMLElement).appendChild(img);
        }
        // ctx.drawImage(img, 0, 0, 50, 50)
    }
}
interface ITask {
    label: string,
    start: number,
    end: number
    color?: string
    imgUrl?: string
}
export const drawClockPointer = (ctx: CanvasRenderingContext2D, props: {
    radius: number,
    taskList: any[]
}) => {
    const { radius } = props;
    const taskList: ITask[] = props.taskList.map((item: any) => {
        const startTime = item.start;
        const endTime = item.end
        return {
            color: item.color,
            label: item.name,
            imgUrl: item.imgUrl,
            start: 24 / (startTime.getHours() + startTime.getMinutes() / 60),
            end: 24 / (endTime.getHours() + endTime.getMinutes() / 60)
        }
    })
    taskList.forEach(item => {
        // ctx.fillStyle = "#000000"
        drawSector(ctx, {
            radius: radius * 0.8,
            start: item.start,
            end: item.end,
            imgUrl: item.imgUrl,
            color: item.color
        })
    })
    //绘制表芯
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI)
    // ctx.fillStyle = "red"
    ctx.closePath();
    ctx.fill()
    //时针
    const now = new Date();
    const seconds = now.getSeconds() + now.getTime() % 1000 / 1000
    const minutes = now.getMinutes() + seconds / 60
    const hours = now.getHours() + minutes / 60;
    drawClockOnePointer(ctx, {
        radius,
        parts: 24,
        postion: hours,
        offset: {
            start: -radius * 1.03,
            end: -radius * 0.4
        },
        lineWidth: 2
    })
    // drawSector(ctx, {
    //     radius:radius*0.6, 
    //     start: 0, 
    //     end: (12 / (hours%12))
    // })
    drawClockOnePointer(ctx, {
        radius,
        parts: 60,
        postion: minutes,
        offset: {
            start: -radius * 1.05,
            end: -radius * 0.2
        },
        lineWidth: 1
    })
    drawClockOnePointer(ctx, {
        radius,
        parts: 60,
        postion: seconds,
        offset: {
            start: -radius * 1.1,
            end: radius * .1
        },
        lineWidth: 0.2
    })


}