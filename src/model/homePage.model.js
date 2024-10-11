const mongoose = require('mongoose')
const homePageSchema = new mongoose.Schema({
    Sec1_Background: {
        type: String
    },
    Sec1_Heading: {
        type: String
    },
    Sec1_description: {
        type: String
    },
    sec1_Image: {
        type: String
    },
    sec2_Heading: {
        type: String
    },
    sec2_SubHeading: {
        type: String
    },
    sec3_Heading1: {
        type: String
    },
    sec3_Image: {
        type: String
    },
    sec3_Heading2: {
        type: String
    },
    sec3_description: {
        type: String
    },
    sec3_content1_image: {
        type: String
    },
    sec3_content1_title: {
        type: String
    },
    sec3_content1_description: {
        type: String
    },
    sec3_content2_image: {
        type: String
    },
    sec3_content2_title: {
        type: String
    },
    sec3_content2_description: {
        type: String
    },
    sec3_content3_image: {
        type: String
    },
    sec3_content3_title: {
        type: String
    },
    sec3_content3_description: {
        type: String
    },
    sec3_content4_image: {
        type: String
    },
    sec3_content4_title: {
        type: String
    },
    sec3_content4_description: {
        type: String
    },
    sec4_Heading: {
        type: String
    },
    sec5_Heading: {
        type: String
    },
    sec5_SubHeading: {
        type: String
    },
    sec5_Content1_image: {
      type: String  
    },
    sec5_content1_title: {
        type: String
    },
    sec5_content1_description: {
        type: String
    },
    sec5_Content2_image: {
        type: String
    },
    sec5_content2_title: {
        type: String
    },
    sec5_content2_description: {
        type: String
    },
    sec5_Content3_image: {
        type: String
    },
    sec5_content3_title: {
        type: String
    },
    sec5_content3_description: {
        type: String
    },
    sec5_Content4_image: {
        type: String
    },
    sec5_content4_title: {
        type: String
    },
    sec5_content4_description: {
        type: String
    },
    sec6_Heading: {
        type:String
    },
    sec6_SubHeading: {
        type: String
    },
    sec6_description: {
        type: String
    },
    sec6_content1_image: {
        type:String
    },
    sec6_content1_title: {
        type:String
    },
    sec6_content2_image: {
        type: String
    },
    sec6_content2_title: {
        type: String
    },
    sec6_content3_image: {
        type: String
    },
    sec6_content3_title: {
        type: String
    },
    sec6_content4_image: {
        type: String
    },
    sec6_content4_title: {
        type: String
    },
    sec7_Heading: {
        type:String
    },
    sec7_SubHeading: {
        type: String
    },
    sec7_description: {
        type: String
    },
    sec7_logo: {
        type: String
    },
    sec7_image: {
        type: String
    },
    sec8_headings: {
        type: String
    },
    sec8_subHeading1: {
        type: String
    },
    sec8_subheading2: {
        type:String
    },
    sec8_image: {
        type: String
    },
    sec8_description: {
        type: String
    },
    sec9_heading: {
        type:String
    },
    sec9_days: {
        type:Number
    },
    sec9_hours: {
        type:Number
    },
    sec9_minutes: {
        type: Number
    },
    sec9_seconds: {
        type: Number
    },
    sec10_heading: {
        type:String
    },
    sec10_descriptions: {
        type: String
    },
    sec11_heading: {
        type:String
    },
    sec11_descriptions: {
        type: String
    },
    sec11_VideoLink: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)
exports.homePageModel = mongoose.model('HomePage',homePageSchema)



















