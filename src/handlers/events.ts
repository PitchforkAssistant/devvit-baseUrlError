import {PostReport} from "@devvit/protos";
import {TriggerContext, OnTriggerEvent, RedditAPIClient} from "@devvit/public-api";

export async function onPostReport (event: OnTriggerEvent<PostReport>, context: TriggerContext) {
    console.log("Functions that call the Reddit API multiple times, but there are awaits after them."); // These will all succeed.
    await approvePostById(context.reddit, event.post?.id ?? "");
    await approvePostById(context.reddit, event.post?.id ?? "").catch(console.error);
    approvePostById(context.reddit, event.post?.id ?? "").catch(console.error);
    void approvePostById(context.reddit, event.post?.id ?? "").catch(console.error);
    void approvePostById(context.reddit, event.post?.id ?? "");

    console.log("Directly calling the Reddit API."); // These will all succeed.
    await context.reddit.approve(event.post?.id ?? "");
    await context.reddit.approve(event.post?.id ?? "").catch(console.error);
    context.reddit.approve(event.post?.id ?? "").catch(console.error);
    void context.reddit.approve(event.post?.id ?? "");

    console.log("Functions that call the Reddit API once."); // These will all succeed. These could also be called at the end and they will still succeed.
    await approveById(context.reddit, event.post?.id ?? "");
    approveById(context.reddit, event.post?.id ?? "").catch(console.error);
    void approveById(context.reddit, event.post?.id ?? "");

    console.log("Functions that call the Reddit API multiple times, with no awaits after them in the event trigger function.");
    await approvePostById(context.reddit, event.post?.id ?? ""); // This will succeed.
    await approvePostById(context.reddit, event.post?.id ?? "").catch(console.error); // This will succeed.
    // If the above two were moved to the bottom, the three below would succeed.
    approvePostById(context.reddit, event.post?.id ?? "").catch(console.error); // This will fail.
    void approvePostById(context.reddit, event.post?.id ?? "").catch(console.error); // This will fail.
    void approvePostById(context.reddit, event.post?.id ?? ""); // This will silently fail.
}

async function approvePostById (reddit: RedditAPIClient, postId: string) {
    const post = await reddit.getPostById(postId);
    await post.approve();
}

async function approveById (reddit: RedditAPIClient, postId: string) {
    return reddit.approve(postId);
}

