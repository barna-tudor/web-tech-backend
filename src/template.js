// template for endpoints
const name = expressAsyncHandler(async (req, res) => {
    const { } = req.params;
    const { } = req.query;
    const { } = req.body;
    try {

        return res.status(200).json({
            status: 200,
            success: true,
            result: {}
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})