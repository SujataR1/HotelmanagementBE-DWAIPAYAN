// const {customerlogin}=require("./customerlogin");
// const {customersignup}=require("./customersignup");
// const router=require("express").Router();

// router.post("/customerlogin",customerlogin);
// router.post("/customersignup",customersignup);
// module.exports=router;

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
 *               Phoneno:
 *                 type: number
 *               Password:
 *                 type: string
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
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - Email
 *               - Phoneno
 *               - Password
 *               - RoleType:ADMIN /CUSTOMER /STAFF
 *             properties: 
 *               Name :
 *                 type:string
 *               Email:
 *                 type: string
 *               Phoneno:
 *                 type: number
 *               Password:
 *                 type: string
 *               RoleType:
 *                 type: ADMIN /CUSTOMER /STAFF
 * 
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Bad request
 */
router.post("/customersignup",customersignup);

module.exports=router;
