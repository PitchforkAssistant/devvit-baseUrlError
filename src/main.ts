import {Devvit} from "@devvit/public-api";
import {onPostReport} from "./handlers/events.js";

Devvit.configure({
    redditAPI: true,
});

Devvit.addTrigger({
    event: "PostReport",
    onEvent: onPostReport,
});

export default Devvit;
