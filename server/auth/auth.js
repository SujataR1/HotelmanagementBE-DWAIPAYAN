
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
 *               - RoleType
 *             properties: 
 *               Name:
 *                 type: string
 *                 example: "Sneha Sharma"
 *               Email:
 *                 type: string
 *                 example: "sneha.sharma@example.com"
 *               Phoneno:
 *                 type: string
 *                 example: "9876543210"
 *               Password:
 *                 type: string
 *                 example: "StrongPass@123"
 *               RoleType:
 *                 type: string
 *                 enum: ["ADMIN", "CUSTOMER", "STAFF"]
 *                 example: "CUSTOMER"
 *     responses:
 *       201:
 *         description: Signup successful
 *       400:
 *         description: Bad request
 */
router.post("/customersignup",customersignup);

module.exports=router;
