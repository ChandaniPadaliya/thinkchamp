const { homePageModel } = require('../../model/homePage.model')
const baseUrl = "http://192.168.29.194/ThinkChamp/Backend/src/uploads/"

exports.addHomePage = async (req, res) => {
    try {
        const file = req.files
        // console.log(file);
        const Sec1_Background = baseUrl + file.Sec1_Background[0].filename
        const Sec1_Heading = "Change the world with Think champ"
        const Sec1_description = "Learn coding using 500+ coding courses, practice problems, projects and AI.Become job ready 10x faster."
        const sec1_Image = baseUrl + file.sec1_Image[0].filename
        const sec2_Heading = "Instantly & Interactively"
        const sec2_SubHeading = "Learn from carefully curated learning paths with up-to-date interactive courses"
        const sec3_Heading1 = "Recognized By"
        const sec3_Image = baseUrl + file.sec3_Image[0].filename
        const sec3_Heading2 = "States in Numbers"
        const sec3_description = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor."
        const sec3_content1_image = baseUrl + file.sec3_content1_image[0].filename
        const sec3_content1_title = "300+"
        const sec3_content1_description = "Placed Companies"
        const sec3_content2_image = baseUrl + file.sec3_content2_image[0].filename
        const sec3_content2_title = "5.5k+"
        const sec3_content2_description = "Successful Students"
        const sec3_content3_image = baseUrl + file.sec3_content3_image[0].filename
        const sec3_content3_title = "500+"
        const sec3_content3_description = "Internships Offered"
        const sec3_content4_image = baseUrl + file.sec3_content4_image[0].filename
        const sec3_content4_title = "500+"
        const sec3_content4_description = "Satisfaction Rate"
        const sec4_Heading = "Think Champ To Inspire You"
        const sec5_Heading = "A Simple 4-Step Process To Enroll Your Kid To Any"
        const sec5_SubHeading = "Coding Course"
        const sec5_Content1_image = baseUrl + file.sec5_Content1_image[0].filename
        const sec5_content1_title = "Sign up"
        const sec5_content1_description = "If you liked the demo session, enroll for the course & begin your child's exciting journey!"
        const sec5_Content2_image = baseUrl + file.sec5_Content2_image[0].filename
        const sec5_content2_title = "Select A Course"
        const sec5_content2_description = "Choose a course of your choice based on the child's age/grade"
        const sec5_Content3_image = baseUrl + file.sec5_Content3_image[0].filename
        const sec5_content3_title = "Start Learning"
        const sec5_content3_description = "Choose your mentor of choice from 200 + mentors as well as your preferred time slot"
        const sec5_Content4_image = baseUrl + file.sec5_Content4_image[0].filename
        const sec5_content4_title = "Get Certificate"
        const sec5_content4_description = "Choose your mentor of choice from 200 + mentors as well as your preferred time slot"
        const sec6_Heading = "Learn to Code from our Instructor"
        const sec6_SubHeading = "Zero Compromise On Trainer Quality"
        const sec6_description = "Our trainers go through a unique selection process to ensure there’s no compromise in quality of teaching kids are endowed with"
        const sec6_content1_image = baseUrl + file.sec6_content1_image[0].filename
        const sec6_content1_title = "Best quality mentors -less than 1 % applicants are selected"
        const sec6_content2_image = baseUrl + file.sec6_content2_image[0].filename
        const sec6_content2_title = "Belong to premier colleges and companies"
        const sec6_content3_image = baseUrl + file.sec6_content3_image[0].filename
        const sec6_content3_title = "Rated 4.7 / 5 on average by students"
        const sec6_content4_image = baseUrl + file.sec6_content4_image[0].filename
        const sec6_content4_title = "Continuously reskill through internal programs"
        const sec7_Heading = "Recognized as"
        const sec7_SubHeading = "Best Tech Skilling EdTech Company of the year 2022"
        const sec7_description = "Our trainers go through a unique selection process to ensure there’s no compromise in quality of teaching kids are endowed with"
        const sec7_logo = baseUrl + file.sec7_logo[0].filename
        const sec7_image = baseUrl + file.sec7_image[0].filename
        const sec8_headings = "Testimonals"
        const sec8_subHeading1 = "Our Students Are Our Strength."
        const sec8_subheading2 = "See What They Say About Us"
        const sec8_image = baseUrl + file.sec8_image[0].filename
        const sec8_description = "Our trainers go through a unique selection process to ensure there’s no   compromise in quality of teaching kids are endowed with"
        const sec9_heading = "Register Now for getting 200 + courses free access.This Offer Limited Time, End In"
        const sec9_days = 7
        const sec9_hours = 10
        const sec9_minutes = 49
        const sec9_seconds = 28
        const sec10_heading = "Special Offers"
        const sec10_descriptions = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more - or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text"
        const sec11_heading = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        const sec11_descriptions = "Corporate training, also known as Workplace Learning or Corporate Education, refers to the process of training employees using a systematic set of learning programs designed to nurture employee job skills and knowledge to improve performance in the workplace. A cloud computing corporate training program may be offered using multiple delivery modes, including online or face-to-face sessions and mentors"
        const sec11_VideoLink = "https://www.youtube.com/embed/DAl3dbTnAgw?si=lZFeZRp0rLwtW0Hc"
        const data = {
            Sec1_Background, Sec1_Heading, Sec1_description, sec1_Image, sec2_Heading, sec2_SubHeading, sec3_Heading1, sec3_Image, sec3_Heading2, sec3_description, sec3_content1_image, sec3_content1_title, sec3_content1_description, sec3_content2_image, sec3_content2_title, sec3_content2_description, sec3_content3_image, sec3_content3_title, sec3_content3_description, sec3_content4_image, sec3_content4_title, sec3_content4_description, sec4_Heading, sec5_Heading, sec5_SubHeading, sec5_Content1_image, sec5_content1_title, sec5_content1_description, sec5_Content2_image, sec5_content2_title, sec5_content2_description, sec5_Content3_image, sec5_content3_title, sec5_content3_description, sec5_Content4_image, sec5_content4_title, sec5_content4_description, sec6_Heading, sec6_SubHeading, sec6_description, sec6_content1_image, sec6_content1_title, sec6_content2_image, sec6_content2_title, sec6_content3_image, sec6_content3_title, sec6_content4_image, sec6_content4_title, sec7_Heading, sec7_SubHeading, sec7_description, sec7_logo, sec7_image, sec8_headings, sec8_subHeading1, sec8_subheading2, sec8_image, sec8_description, sec9_heading, sec9_days, sec9_hours, sec9_minutes, sec9_seconds, sec10_heading, sec10_descriptions, sec11_heading, sec11_descriptions, sec11_VideoLink,
        }
        const saveData = new homePageModel(data)
        await saveData.save()
        return res.send({ status: true, subCode: 200, message: "page added successfully ", data: saveData })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params._id;
        // console.log(id);
        const data = await homePageModel.findOne({ _id: id, isDelete: false })
        if (!data) {
            return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
        }
        if (data.isActive === true) {
            return res.send({ status: true, subCode: 200, message: "data get successfully ", data: data })
        } else {
            return res.send({ status: false, subCode: 400, message: "data not exist" })
        }
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}

exports.editHomePage = async (req, res) => {
    try {
        const id = req.body.id;
        const content = await homePageModel.findOne({ _id: id, isDelete: false })
        const file = req.files
        const Sec1_Heading = req.body.Sec1_Heading
        const Sec1_description = req.body.Sec1_description
        let Sec1_Background
        if (!file || !file.Sec1_Background || !file.Sec1_Background[0] || !file.Sec1_Background[0].filename) {
            Sec1_Background = content.Sec1_Background
        } else {
            Sec1_Background = baseUrl + file.Sec1_Background[0].filename
        }
        let sec1_Image
        if (!file || !file.sec1_Image || !file.sec1_Image[0] || !file.sec1_Image[0].filename) {
            sec1_Image = content.sec1_Image
        } else {
            sec1_Image = baseUrl + file.sec1_Image[0].filename
        }
        const sec2_Heading = req.body.sec2_Heading
        const sec2_SubHeading = req.body.sec2_SubHeading
        const sec3_Heading1 = req.body.sec3_Heading1
        let sec3_Image
        if (!file || !file.sec3_Image || !file.sec3_Image[0] || !file.sec3_Image[0].filename) {
            sec3_Image = content.sec3_Image
        } else {
            sec3_Image = baseUrl + file.sec3_Image[0].filename
        }
        const sec3_Heading2 = req.body.sec3_Heading2
        const sec3_description = req.body.sec3_description
        let sec3_content1_image
        if (!file || !file.sec3_content1_image || !file.sec3_content1_image[0] || !file.sec3_content1_image[0].filename) {
            sec3_content1_image = content.sec3_content1_image
        } else {
            sec3_content1_image = baseUrl + file.sec3_content1_image[0].filename
        }
        const sec3_content1_title = req.body.sec3_content1_title
        const sec3_content1_description = req.body.sec3_content1_description
        let sec3_content2_image
        if (!file || !file.sec3_content2_image || !file.sec3_content2_image[0] || !file.sec3_content2_image[0].filename) {
            sec3_content2_image = content.sec3_content2_image
        } else {
            sec3_content2_image = baseUrl + file.sec3_content2_image[0].filename
        }
        const sec3_content2_title = req.body.sec3_content2_title
        const sec3_content2_description = req.body.sec3_content2_description
        let sec3_content3_image
        if (!file || !file.sec3_content3_image || !file.sec3_content3_image[0] || !file.sec3_content3_image[0].filename) {
            sec3_content3_image = content.sec3_content3_image
        } else {
            sec3_content3_image = baseUrl + file.sec3_content3_image[0].filename
        }
        const sec3_content3_title = req.body.sec3_content3_title
        const sec3_content3_description = req.body.sec3_content3_description
        let sec3_content4_image
        if (!file || !file.sec3_content4_image || !file.sec3_content4_image[0] || !file.sec3_content4_image[0].filename) {
            sec3_content4_image = content.sec3_content4_image
        } else {
            sec3_content4_image = baseUrl + file.sec3_content4_image[0].filename
        }
        const sec3_content4_title = req.body.sec3_content4_title
        const sec3_content4_description = req.body.sec3_content4_description
        const sec4_Heading = req.body.sec4_Heading
        const sec5_Heading = req.body.sec5_Heading
        const sec5_SubHeading = req.body.sec5_SubHeading
        let sec5_Content1_image
        if (!file || !file.sec5_Content1_image || !file.sec5_Content1_image[0] || !file.sec5_Content1_image[0].filename) {
            sec5_Content1_image = content.sec5_Content1_image
        } else {
            sec5_Content1_image = baseUrl + file.sec5_Content1_image[0].filename
        }
        const sec5_content1_title = req.body.sec5_content1_title
        const sec5_content1_description = req.body.sec5_content1_description
        let sec5_Content2_image
        if (!file || !file.sec5_Content2_image || !file.sec5_Content2_image[0] || !file.sec5_Content2_image[0].filename) {
            sec5_Content2_image = content.sec5_Content2_image
        } else {
            sec5_Content2_image = baseUrl + file.sec5_Content2_image[0].filename
        }
        const sec5_content2_title = req.body.sec5_content2_title
        const sec5_content2_description = req.body.sec5_content2_description
        let sec5_Content3_image
        if (!file || !file.sec5_Content3_image || !file.sec5_Content3_image[0] || !file.sec5_Content3_image[0].filename) {
            sec5_Content3_image = content.sec5_Content3_image
        } else {
            sec5_Content3_image = baseUrl + file.sec5_Content3_image[0].filename
        }
        const sec5_content3_title = req.body.sec5_content3_title
        const sec5_content3_description = req.body.sec5_content3_description
        let sec5_Content4_image
        if (!file || !file.sec5_Content4_image || !file.sec5_Content4_image[0] || !file.sec5_Content4_image[0].filename) {
            sec5_Content4_image = content.sec5_Content4_image
        } else {
            sec5_Content4_image = baseUrl + file.sec5_Content4_image[0].filename
        }
        const sec5_content4_title = req.body.sec5_content4_title
        const sec5_content4_description = req.body.sec5_content4_description
        const sec6_Heading = req.body.sec6_Heading
        const sec6_SubHeading = req.body.sec6_SubHeading
        const sec6_description = req.body.sec6_description
        let sec6_content1_image
        if (!file || !file.sec6_content1_image || !file.sec6_content1_image[0] || !file.sec6_content1_image[0].filename) {
            sec6_content1_image = content.sec6_content1_image
        } else {
            sec6_content1_image = baseUrl + file.sec6_content1_image[0].filename
        }
        const sec6_content1_title = req.body.sec6_content1_title
        let sec6_content2_image
        if (!file || !file.sec6_content2_image || !file.sec6_content2_image[0] || !file.sec6_content2_image[0].filename) {
            sec6_content2_image = content.sec6_content2_image
        } else {
            sec6_content2_image = baseUrl + file.sec6_content2_image[0].filename
        }
        const sec6_content2_title = req.body.sec6_content2_title
        let sec6_content3_image
        if (!file || !file.sec6_content3_image || !file.sec6_content3_image[0] || !file.sec6_content3_image[0].filename) {
            sec6_content3_image = content.sec6_content3_image
        } else {
            sec6_content3_image = baseUrl + file.sec6_content3_image[0].filename
        }
        const sec6_content3_title = req.body.sec6_content3_title
        let sec6_content4_image
        if (!file || !file.sec6_content4_image || !file.sec6_content4_image[0] || !file.sec6_content4_image[0].filename) {
            sec6_content4_image = content.sec6_content4_image
        } else {
            sec6_content4_image = baseUrl + file.sec6_content4_image[0].filename
        }
        const sec6_content4_title = req.body.sec6_content4_title
        const sec7_Heading = req.body.sec7_Heading
        const sec7_SubHeading = req.body.sec7_SubHeading
        const sec7_description = req.body.sec7_description
        let sec7_logo
        if (!file || !file.sec7_logo || !file.sec7_logo[0] || !file.sec7_logo[0].filename) {
            sec7_logo = content.sec7_logo
        } else {
            sec7_logo = baseUrl + file.sec7_logo[0].filename
        }
        let sec7_image
        if (!file || !file.sec7_image || !file.sec7_image[0] || !file.sec7_image[0].filename) {
            sec7_image = content.sec7_image
        } else {
            sec7_image = baseUrl + file.sec7_image[0].filename
        }
        const sec8_headings = req.body.sec8_headings
        const sec8_subHeading1 = req.body.sec8_subHeading1
        const sec8_subheading2 = req.body.sec8_subheading2
        let sec8_image
        if (!file || !file.sec8_image || !file.sec8_image[0] || !file.sec8_image[0].filename) {
            sec8_image = content.sec8_image
        } else {
            sec8_image = baseUrl + file.sec8_image[0].filename
        }
        const sec8_description = req.body.sec8_description
        const sec9_heading = req.body.sec9_heading
        const sec9_days = 7
        const sec9_hours = 10
        const sec9_minutes = 49
        const sec9_seconds = 28
        const sec10_heading = req.body.sec10_heading
        const sec10_descriptions = req.body.sec10_descriptions
        const sec11_heading = req.body.sec11_heading
        const sec11_descriptions = req.body.sec11_descriptions
        const sec11_VideoLink = req.body.sec11_VideoLink
        const newData = {
            Sec1_Background, Sec1_Heading, Sec1_description, sec1_Image, sec2_Heading, sec2_SubHeading, sec3_Heading1, sec3_Image, sec3_Heading2, sec3_description, sec3_content1_image, sec3_content1_title, sec3_content1_description, sec3_content2_image, sec3_content2_title, sec3_content2_description, sec3_content3_image, sec3_content3_title, sec3_content3_description, sec3_content4_image, sec3_content4_title, sec3_content4_description, sec4_Heading, sec5_Heading, sec5_SubHeading, sec5_Content1_image, sec5_content1_title, sec5_content1_description, sec5_Content2_image, sec5_content2_title, sec5_content2_description, sec5_Content3_image, sec5_content3_title, sec5_content3_description, sec5_Content4_image, sec5_content4_title, sec5_content4_description, sec6_Heading, sec6_SubHeading, sec6_description, sec6_content1_image, sec6_content1_title, sec6_content2_image, sec6_content2_title, sec6_content3_image, sec6_content3_title, sec6_content4_image, sec6_content4_title, sec7_Heading, sec7_SubHeading, sec7_description, sec7_logo, sec7_image, sec8_headings, sec8_subHeading1, sec8_subheading2, sec8_image, sec8_description, sec9_heading, sec9_days, sec9_hours, sec9_minutes, sec9_seconds, sec10_heading, sec10_descriptions, sec11_heading, sec11_descriptions, sec11_VideoLink,
        }
        const data = await homePageModel.findOneAndUpdate(
            { _id: id, isDelete: false },
            newData
            , { new: true }
        );
        if (!data) {
            return res.send({ status: false, subCode: 400, message: "data not found ", data: data })
        }
        if (data.isDelete === true) {
            // Course with the given id not found
            return res.send({ status: false, subCode: 404, message: "data not found.", data: null });
        }
        return res.send({ status: true, subCode: 200, message: "homePage updated successfully ", data: data })
    } catch (error) {
        console.log("Helper Err:", error);
        return res.send({ status: false, subCode: 400, message: error.message })
    }
}