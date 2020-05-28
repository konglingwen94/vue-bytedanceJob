const router = require("express").Router();

const staffStoryController=require('./controller/staff-stories')
const jobController=require('./controller/jobs')
const productAndStandardController=require('./controller/productAndStandard')

// staff stories routes

router.get('/staff-stories',staffStoryController.queryList)
router.get('/staff-stories/:id',staffStoryController.queryOne)


// jobs routes
router.post("/jobs", jobController.queryList);
router.get("/jobs/:id", jobController.queryOne);

router.get("/job-filters",jobController.queryFilters);
router.get("/job-categories",jobController.queryJobCategoryList);

// product and byteStandard

router.get('/products',productAndStandardController.queryProducts)
router.get('/byte-standards',productAndStandardController.queryByteStandards)

module.exports = router;
