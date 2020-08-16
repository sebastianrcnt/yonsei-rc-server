import mysql, { ConnectionConfig, OkPacket } from "mysql";
import User from "./models/user";
import Program from "./models/program";
import config from "config";

const dbInfo: ConnectionConfig = config.get("dbInfo");

if (dbInfo.password === "") {
	console.log(dbInfo);
	console.error("FATAL: yonsei_DBPWD doesn't defined");
	process.exit(1);
}
console.log(dbInfo.password);

const connection = mysql.createConnection(dbInfo);
connection.connect((err) =>
	err
		? console.error("MySQL connection Error: ", err.sqlMessage)
		: console.log("Connected to MySQL with id: ", connection.threadId)
);

function createProgram(program: Program) {
	return new Promise<number>((resolve, reject) => {
		connection.query(
			`
    INSERT INTO programs
    VALUES(
      DEFAULT,
      '${program.name}',
      '${program.description}'
		);
    `,
			(err, data) => (err ? reject(err) : resolve(data.insertID))
		);
	});
}

function readPrograms() {
	return new Promise<Program[]>((resolve, reject) => {
		connection.query(
			`
    SELECT *
    FROM programs
    `,
			(err, data) => (err ? reject(err) : resolve(data))
		);
	});
}

function readProgram(id: number) {
	return new Promise<Program>((resolve, reject) => {
		connection.query(
			`
    SELECT *
    FROM programs
    WHERE program_id = ${id}
    `,
			(err, data) => (err ? reject(err) : resolve(data[0]))
		);
	});
}

function updateProgram(id: number, program: Program) {
	return new Promise<Program>((resolve, reject) => {
		connection.query(
			`
    UPDATE programs
		SET name = '${program.name}', description = '${program.description}'
		WHERE program_id = ${id};
    `,
			(err, data) => (err ? reject(err) : resolve(data[0]))
		);
	});
}

function deleteProgram(id: number) {
	return new Promise<Program>((resolve, reject) => {
		connection.query(
			`
    DELETE FROM programs
    WHERE program_id = ${id};
    `,
			(err, data) => (err ? reject(err) : resolve(data[0]))
		);
	});
}

function createUser(user: User) {
	return new Promise<User>((resolve, reject) => {
		connection.query(
			`
		INSERT INTO users
		VALUES (
			DEFAULT,
			'${user.student_id}',
			'${user.password}',
			'${user.first_name}',
			'${user.last_name}',
			${user.role_id}
		);
		`,
			(err, result: OkPacket) =>
				err
					? reject(err)
					: result.affectedRows === 0
					? reject(new Error("insert doesn't work"))
					: resolve({ user_id: result.insertId, ...user })
		);
	});
}

function readUsers() {
	return new Promise<User[]>((resolve, reject) => {
		connection.query(
			`
    SELECT *
    FROM users
    `,
			(err, data) => (err ? reject(err) : resolve(data))
		);
	});
}

function readUser(id: number) {
	return new Promise<User>((resolve, reject) => {
		connection.query(
			`
    SELECT *
		FROM users
		WHERE user_id = ${id}
    `,
			(err, data) => (err ? reject(err) : resolve(data[0]))
		);
	});
}

function readUserByStudentID(student_id: any) {
	return new Promise<User>((resolve, reject) => {
		connection.query(
			`
    SELECT *
		FROM users
		WHERE student_id = ${student_id}
    `,
			(err, data) => (err ? reject(err) : resolve(data[0]))
		);
	});
}

export default {
	connection,
	createProgram,
	readPrograms,
	readProgram,
	updateProgram,
	deleteProgram,
	createUser,
	readUsers,
	readUser,
	readUserByStudentID
};
