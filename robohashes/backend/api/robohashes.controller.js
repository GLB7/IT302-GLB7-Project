import RobohashesDAO from '../dao/robohashesDAO.js'

export default class RobohashesController {
    static async apiGetRobohashes(req, res, next) {
        const robohashesPerPage = req.query.robohashesPerPage ? parseInt(req.query.robohashesPerPage) : 5 // 1.itemsPerPage
        const page = req.query.page ? parseInt(req.query.page) : 0 // 2.pageNumber

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name // 3.a text filter for the unique title or name of each document
        } else if (req.query.set) {
            filters.set = req.query.set // 4.(additional filter values are optional)
        } else if (req.query.color) {
            filters.color = req.query.color // 4.(additional filter values are optional)
        }

        const { robohashesList, totalNumRobohashes } = await RobohashesDAO.getRobohashes({
            filters, page, robohashesPerPage
        })

        // Debugging (This appears in terminal not front end console)
        console.log("_______________________");
        console.log("Page:", page);
        console.log("Filters:", filters);
        console.log("Entries Per Page:", robohashesPerPage);
        console.log("Total Results:", totalNumRobohashes);
        console.log("_______________________");

        let response = {
            robohashes: robohashesList,
            page: page,
            filters: filters,
            entries_per_page: robohashesPerPage,
            total_results: totalNumRobohashes,
        }

        res.json(response)
    }
}