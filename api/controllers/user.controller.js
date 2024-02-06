import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json('API radi! Ura!');
};


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId){
        return next(errorHandler(403, 'Izmena nije moguća'));
    }
    if (req.body.password){
        if(req.body.password.lenght < 4){
            return next(errorHandler(400, 'Lozinka mora sadržati najmanje 4 karaktera'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username){
        if(req.body.username.lenght < 5 || req.body.username.lenght > 15){
            return next(errorHandler(400, 'Korisnik mora imati između 5 i 15 karaktera'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Space nije dozvoljen'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Nisu dozvoljena velika slova'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Korisničko ime može sadržati samo slova i brojeve'));
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, { new: true });
            const { password, ...rest } = updateUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Brisanje nije moguće'));
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json('Uspešno ste izbrisali korisnika');
    } catch (error) {
      next(error);
    }
  };


  export const signout = (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json('Uspešno ste se odjavili!');
    } catch (error) {
      next(error);
    }
  };  