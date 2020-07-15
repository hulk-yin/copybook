
declare namespace Clock {

}

// interface Clock {
// //   drawClockBlank: () => void
// //   drawClockPointer: () => void
// // }
// interface ClockConstructor {
//   new(ctx: CanvasRenderingContext2D, options: {
//     radius: number
//   }): ClockInterface
// }
// interface ClockInterface {
//   drawClockBlank: () => void
// }
declare class IClock {
  constructor(ctx: CanvasRenderingContext2D, options: {
    radius: number
  })
  ctx: CanvasRenderingContext2D
  options: {
    radius: number
  }
  // private getRadian: (parts: number, postion: number) => number
  // private drawClockCalibration: (props: {
  //   parts: 12 | 24 | 60 | 120
  //   size: [number, number, number?]
  //   textOffset?: number
  // }) => void
  public drawClockBlank: () => void
  // private drawClockOnePointer: (props: {
  //   parts: number
  //   postion: number
  //   offset?: {
  //     start?: number
  //     end?: number
  //   }
  //   lineWidth?: number
  // }) => void
  public drawClockPointer: () => void
}
