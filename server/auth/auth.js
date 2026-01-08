
const {customerlogin}=require("./customerlogin");
const {customersignup}=require("./customersignup");
const router=require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /customerlogin:
 *   post:
 *     summary: Customer Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - Phoneno
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *                 example: "sneha.sharma@example.com"
 *               Phoneno:
 *                 type: string
 *                 example: "9876543210"
 *               Password:
 *                 type: string
 *                 example: "StrongPass@123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/customerlogin",customerlogin);

/**
 * @swagger
 * /customersignup:
 *   post:
 *     summary: Customer Signup
 *     description: Register a new user (Customer/Admin/Staff)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - password
 *               - roleType
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Rahul"
 *               lastName:
 *                 type: string
 *                 example: "Das"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "rahul.das89@example.com"
 *               phone:
 *                 type: object
 *                 required:
 *                   - countryCode
 *                   - number
 *                 properties:
 *                   countryCode:
 *                     type: string
 *                     example: "+91"
 *                   number:
 *                     type: string
 *                     example: "9123456789"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass@456"
 *               roleType:
 *                 type: string
 *                 enum: [ADMIN, CUSTOMER, STAFF]
 *                 example: CUSTOMER
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1994-08-15"
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 example: MALE
 *               address:
 *                 type: object
 *                 required:
 *                   - line1
 *                   - line2
 *                   - city
 *                   - state
 *                   - country
 *                   - pincode
 *                 properties:
 *                   line1:
 *                     type: string
 *                     example: "Flat 4B, Lake View Apartments"
 *                   line2:
 *                     type: string
 *                     example: "Salt Lake Sector V"
 *                   city:
 *                     type: string
 *                     example: Kolkata
 *                   state:
 *                     type: string
 *                     example: West Bengal
 *                   country:
 *                     type: string
 *                     example: India
 *                   pincode:
 *                     type: string
 *                     example: "700091"
 *               preferences:
 *                 type: object
 *                 required:
 *                   - language
 *                   - currency
 *                   - smokingRoom
 *                 properties:
 *                   language:
 *                     type: string
 *                     example: en
 *                   currency:
 *                     type: string
 *                     example: INR
 *                   smokingRoom:
 *                     type: boolean
 *                     example: false
 *               corporateBooking:
 *                 type: object
 *                 properties:
 *                   companyName:
 *                     type: string
 *                     example: "TechNova Solutions Pvt Ltd"
 *                   gstNumber:
 *                     type: string
 *                     example: "19AACCT1234G1Z7"
 *               emergencyContact:
 *                 type: object
 *                 required:
 *                   - name
 *                   - relationship
 *                   - phone
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Amit Das
 *                   relationship:
 *                     type: string
 *                     example: Brother
 *                   phone:
 *                     type: object
 *                     required:
 *                       - countryCode
 *                       - number
 *                     properties:
 *                       countryCode:
 *                         type: string
 *                         example: "+91"
 *                       number:
 *                         type: string
 *                         example: "9876543210"
 *               accessibility:
 *                 type: object
 *                 properties:
 *                   specialAssistanceRequired:
 *                     type: boolean
 *                     example: false
 *                   assistanceDetails:
 *                     type: string
 *                     example: ""
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email already exists
 */

router.post("/customersignup",customersignup);

module.exports=router;
