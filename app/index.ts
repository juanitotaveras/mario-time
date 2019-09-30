import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

const h0 = document.getElementById("h0");
const h1 = document.getElementById("h1");
const m0 = document.getElementById("m0");
const m1 = document.getElementById("m1");
const days: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const day0 = document.getElementById("day-0");
const day1 = document.getElementById("day-1");
// Update the <text> element every tick with the current time
clock.ontick = (evt: any) => {
  // console.log(new Date().toDateString());
  let today = evt.date;
  let hours: string = today.getHours().toString();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = (parseInt(hours, 10) % 12 || 12).toString();
  } else {
    // 24h format
    hours = util.zeroPad(parseInt(hours, 10));
    // h0.setAttribute("href", "0.png");
  }
  let mins = util.zeroPad(today.getMinutes());
  // myLabel.text = `${hours}:${mins}`;
  (h0 as any).href = `${hours.charAt(0)}.png`;
  (h1 as any).href = `${hours.charAt(1)}.png`;
  (m0 as any).href = `${mins.charAt(0)}.png`;
  // (m1 as any).href = `${mins.charAt(1)}.png`;
  (m1 as any).href = `0.png`;

  const day: string = days[parseInt(today.getDay(), 10)];
  for (let i = 0; i < day.length; i++) {
    let s = (day as any).charAt(i);
    const elem = document.getElementById(`week-${i}`);
    (elem as any).href = `${s}.png`;
  }

  const date: string = util.zeroPad(today.getUTCDate().toString());
  console.error(date);
  (day0 as any).href = `${date.charAt(0)}-sub.png`;
  (day1 as any).href = `${date.charAt(1)}-sub.png`;
};
