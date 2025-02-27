export const load = async (c) => {
    console.log("-------layout.server.js----------");
    console.log(JSON.stringify(c));
    return c.locals;
};
