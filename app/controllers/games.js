'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const GameRecords = mongoose.model('Records');

/**
 * Find Game Records by Gameid
 */
exports.getGameRecords = (req, res) => {
  const gameID = req.params.id;
  GameRecords.findOne({
    gameID: gameID
  }, (err, savedGame) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!savedGame) {
      return res.status(400).json({
        success: false,
        message: 'Game Record Not Found!!'
      });
    } else {
      return res.status(200).json(savedGame);
    }
  });
};

/**
 * Store Game Record
 */
exports.saveRecords = (req, res) => {
  const gameID = req.body.gameID;
  const players = req.body.players;
  const gameCreator = req.body.gameCreator;
  const completed = req.body.completed;
  const winner = req.body.winner;
  const rounds = req.body.rounds;
  const gameDate = req.body.gameDate;
  const gameStartedAt = req.body.timestamp;

  const gameRecord = new GameRecords({
    gameID,
    players,
    gameCreator,
    completed,
    rounds,
    winner,
    gameDate,
    gameStartedAt
  });

  gameRecord.save((err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).json({
      success: true,
      data: data,
      message: 'Thanks for starting a game!'
    });
  });
};


/*
 * Update Game Record
 */

exports.updateRecords = (req, res) => {
  const gameID = req.body.gameID;
  const completed = req.body.completed;
  const winner = req.body.winner;
  const rounds = req.body.rounds;

  GameRecords.findOneAndUpdate({
    gameID: gameID
  }, {
    $set: {
      completed: completed,
      rounds: rounds,
      winner: winner
    }
  }, { new: true},
  (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).json({
      success: true,
      message: 'Game Record updated',
      data: data
    });
  });
};
