/**------------------------------------------------------------------------
 * !                               IMPORTS

 *------------------------------------------------------------------------**/

const express = require('express');
const sequelize = require('./utils/database');

const Courses = require('./models/course');
const Student = require('./models/student');

const app = express();
const port = 8000;

/**------------------------------------------------------------------------
 * *                                Middleware
 *------------------------------------------------------------------------**/



app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



/**------------------------------------------------------------------------
 * *                             Sequelize Database sync
------------------------------------------------------------**/

sequelize.sync({ force: false })
    .then(() => {
        console.log('database synced')
    })
    .catch(err => console.error('Cant sync', err));


/**========================================================================
 * ?                              STUDENT ROUTES
 *
 *
 *
 *
 *========================================================================**/
/**------------------------------------------------------------------------
 * *                          Fetch all Students route (index.ejs)
 *------------------------------------------------------------------------**/

app.get('/', async (request, response) => {
    const students = await Student.findAll();
    response.render('index', { students })
})



/**------------------------------------------------------------------------
 * *                                Add Students Route
 *------------------------------------------------------------------------**/

app.get('/add', (request, response) => {
    response.render('add-student');
})

app.post('/add', async (request, response) => {
    const { firstname, lastname, email, age } = request.body
    // insert data into db using sequelize
    await Student.create({ firstname, lastname, email, age });
    response.redirect('/');
})


/**------------------------------------------------------------------------
 * *                                Editing Students Route
 *------------------------------------------------------------------------**/

app.get('/edit/:id', async (request, response) => {
    const student = await Student.findByPk(request.params.id);
    response.render('edit-students', { student })
})

app.post('/edit/:id', async (request, response) => {
    const { firstname, lastname, email, age } = request.body;
    await Student.update({ firstname, lastname, email, age }, {
        where: { id: request.params.id }
    });
    response.redirect('/')
})


/**------------------------------------------------------------------------
 * *                                Delete Students Route
 *------------------------------------------------------------------------**/

app.get('/delete/:id', async (request, response) => {
    await Student.destroy({ where: { id: request.params.id } });
    response.redirect('/')
})

// ? ---------------------------- END STUDENT ROUTES ----------------------------*/

/**========================================================================
 * ?                              COURSE ROUTES
 *
 *
 *
 *
 *========================================================================**/


/**------------------------------------------------------------------------
 * *                                READ Courses Routes
 *   
 *   
 *   
 *
 *------------------------------------------------------------------------**/


app.get('/courses', async (request, response) => {
    const courses = await Courses.findAll();
    response.render('courses', { courses })
})

/**------------------------------------------------------------------------
 * *                                Write Courses Routes
 *------------------------------------------------------------------------**/


app.get('/add-course', async (request, response) => {
    response.render('add-course')
})

app.post('/add-course', async (request, response) => {
    const { coursename, description, credit } = request.body;
    await Courses.create({ coursename, description, credit })
    response.redirect('/courses')
})


/**------------------------------------------------------------------------
 * *                                Update Courses Routes
 *------------------------------------------------------------------------**/


app.get('/edit-courses', async (request, response) => {
    const courses = await Courses.findByPk(3)
    response.render('edit-courses', { courses })
})

app.get('/edit-course/:id', async (request, response) => {
    const courses = await Courses.findByPk(request.params.id);
    response.render('edit-courses', { courses })
})

app.post('/edit-course/:id', async (request, response) => {
    const { coursename, description, credit } = request.body;
    await Courses.update({ coursename, description, credit }, {
        where: { id: request.params.id }
    });
    response.redirect('/courses')
})



/**------------------------------------------------------------------------
 * *                                Delete Courses Routes
 *------------------------------------------------------------------------**/

app.get('/delete-course/:id', async (request, response) => {
    await Courses.destroy({ where: { id: request.params.id } });
    response.redirect('courses')
})


/**========================================================================
 * !                              SERVER INITIALIZATION
 *========================================================================**/

app.listen(port, () => {
    console.log(`server is up and running on ${port}`)
})