interface Request {
    query: {
        page: number,
        limit: number
    }
}


const Paginate = (req: Request, count: number) => ({
    currentPage: +req.query.page || 1,
    totalCount: count,
    perPage: req.query.limit || 50,
    pageCount: Math.ceil(count / (req.query.limit || 50)) || 1,
});

export default Paginate;
