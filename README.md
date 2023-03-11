# mern-stack-example
Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## How To Run
Create an Atlas URI connection parameter in `mern/server/config.env` with your Atlas URI:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=5000
```

Start server:
```
cd mern/server
npm install
npm start
```

Start Web server
```
cd mern/client
npm install
npm start
```

## Disclaimer

Use at your own risk; not a supported MongoDB product

## React Essay

- What's the difference between React and React Native
 
	The main difference is that React is used for building web application, 
	while React Native is used for building native mobile applications.


- Is React a framework or library? what's the difference

 	React is often referred to as 'library' instead of 'framework' because it provides tools
	and components for building UI. It does not have a specific design pattern  for building application.
	This give more flexibility on how it can structure code and allows modularity and reuse of components.
	However, React cna be combined with otehr libraries and tools to form a more comprehensive framwork
	for building web applications.

- What are the differences between HTML and JSX (compare and contrast HTML and JSX)

	HTML is a language  used to create static web page, while JSX is used to create dynamic
	and interactive used interfaces. JSX allows is user to write HTMllike syxtax directly
	into Javascript code, which is the main difference with HTMl, that requires a seperate file.
	

- What makes React attactive for ou case

	JSX is more integrated with Javascript, because it allows you to write JTML like syntax
	directly into JS code. This means that you can use function an variables within your JSX code
	without having to change between JS and HTML files. JSX is also compiled to Javascript code,
	it can take advanatge of all the features and libraries available in JS ecosystem.
	
	
	



## MERN

- What are few alternate tech stacks?

	MEAN - MongoDB, Express, Angular, NodeJs
	MEVN - MongoDB, Express, VueJs, NodeJs
	LAMP - Linux, Apache, MySQL, PHP


- Why is MERN a good choice for full development?

	MERN (MongoDB, Express, React, NodeJS) is a popular technology stack for
	building full-stack web applications. MERN are open source well documented technologies 
	with large communities. Use Javascript for both server-side and client-side, 
	which make developement faster and more efficient and code can be shared between the server and client side.
	
	Also MERN are known fo their high performance, because MongoDB and NodeJs are designed
	for high scalability and perfomance. It can be adapted for small single page application
	or large scale system use by enterprise.

	Finally, MERN allows for rapid developement of web applications, whith focuc on speed
	and efficiency. React provides a component-bases architecture that allows for 
	reusable code and Express provides a lightweight and flexible web framework.
