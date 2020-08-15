import mysql, { ConnectionConfig } from "mysql";
import User from "./user";
import Program from "./program";

const dbInfo: ConnectionConfig = {
	host: "localhost",
	user: "root",
	password: "8888",
	database: "yonsei_rc",
	dateStrings: true
};

const connection = mysql.createConnection(dbInfo);
connection.connect((err) =>
	err
		? console.error("MySQL connection Error: ", err.sqlMessage)
		: console.log("Connected to MySQL with id: ", connection.threadId)
);

function createProgram(program: Program) {
	return new Promise<Program>((resolve, reject) => {
		connection.query(
			`
    INSERT INTO programs
    VALUES(
      DEFAULT,
      '${program.name}',
      '${program.description}'
    )
    `,
			(err, data) => (err ? reject(err) : resolve(data[0]))
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
	readUsers,
	readUser
};
