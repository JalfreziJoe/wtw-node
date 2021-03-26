exports.login = (req, res, next) => {
    console.log('login');

    res.status(200).json({ message: 'user login' });
};

exports.addUser = (req, res, next) => {
    console.log('add user');

    res.status(200).json({ message: 'add user' });
};

exports.editUser = (req, res, next) => {
    console.log('edit user');
    res.status(200).json({ message: 'edit user' });
};

exports.deleteUser = (req, res, next) => {
    console.log('delete user');
    res.status(200).json({ message: 'delete user' });
};
