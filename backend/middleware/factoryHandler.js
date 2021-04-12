const asyncHandler = require("./asyncHandler");
const AppError = require("./../utils/appError");
const QueryAPI = require("./../utils/queryApi");
const obj = require("./../utils/objectHelpers");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    if (
      doc.createdBy._id.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new AppError("You do not have permisson to perfomr this acton", 403)
      );
    }

    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model, ...allowedFields) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const doc = await Model.findById(req.params.id);
    const filteredBody = obj.objFilter(req.body, ...allowedFields);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    if (req.body.createdBy) {
      return next(
        new AppError("You do not have permission to set creactedby field", 403)
      );
    }

    if (
      doc.createdBy._id.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new AppError("You do not have permisson to perfomr this acton", 403)
      );
    }

    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        data: updatedDoc,
      },
    });
  });

exports.createOne = (Model, ...allowedFields) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const filteredBody = obj.objFilter(req.body, ...allowedFields);

    if (req.body.createdBy) {
      return next(
        new AppError("You do not have permission to set creactedby field", 403)
      );
    }

    const doc = await Model.create({ ...filteredBody, createdBy: userId });

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;
    if (!doc) {
      return next(new AppError("No tour found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const totalNumberOfDocuments = new QueryAPI(
      Model.find(),
      req.query
    ).countAllDocuments();

    const numberOfDocuments = await totalNumberOfDocuments.query;

    const features = new QueryAPI(Model.find(), req.query)
      .filter()
      .sort()
      .selectFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      allResults: numberOfDocuments,
      data: {
        data: doc,
      },
    });
  });
