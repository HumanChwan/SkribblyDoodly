
var zigzagLevelOrder = function (root) {

    // What we do here is perform the normal
    // level order traversal in rows.
    // But we instead use a stack / queue depending
    // on if we're to zig zag or not.

    // Base case, we have no root.
    if (!root) {
        return [];
    }
    let queue       = [root];
    let level_order = [];
    let zigzag      = true;

    // So we perform a normal iterative level order traversal.
    while (queue.length && 1) {

        let queue_len = queue.length;

        // So we're always going to invert the order of the rows.
        // We do this to create our zig zag effect.
        // Back, forward, back, forward, etc.
        zigzag = !zigzag;

        // We're going to get everything in the queue.
        // at this particular moment and nothing more.
        for (let counter = 0; counter < queue_len; counter++) {

            // Grab the current node by removing it off the end of the queu
            // Add to the queue. 
            node.left  ? queue.unshift(node.left) : null;
            node.right ? queue.unshift(node.right): null;
        }

        // Push to the level_order array.
        level_order.push(row);
    }

    // Return the level_order array.
    return level_order;
};

DEV Community 👩‍💻👨‍💻 — A constructive and inclusive social network for software developers. With you every step of your journey.

Built on Forem — the open source software that powers DEV and other inclusive communities.

Made with love and Ruby on Rails. DEV Community 👩‍💻👨‍💻 © 2016 - 2022.
