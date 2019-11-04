module.exports = {
    method: 'GET',
    path: '/test/{id}',
    options: {
        handler: async (request, h) => {
            return { msg: `${request.params.id}.${parseInt(request.params.id, 10) * 2} here` };
        },
    },
};
