import { Cat, CatType } from "./cats.model";
import { Router } from "express";
import { ModuleResolutionKind } from "typescript";

const router = Router();
router.get("/cats", (req, res) => {
    try {
        const cats = Cat;
        res.status(200).send({
            success: true,
            data: {
                cats,
            },
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

router.get("/cats/:id", (req, res) => {
    try {
        const params = req.params;
        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        });
        res.status(200).send({
            success: true,
            data: {
                cat,
            },
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

router.post("/cats", (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        Cat.push(data);
        res.status(200).send({
            success: true,
            data: { data },
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// UPDATE 고양이 업데이트 -> PUT
router.put("/cats/:id", (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = body;
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                cat: result,
            },
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// UPDATE 고양이 데이터 부분적 업데이트 -> PATCH
router.patch("/cats/:id", (req, res) => {
    try {
        const params = req.params;
        const body = req.body;
        let result;
        Cat.forEach((cat) => {
            if (cat.id === params.id) {
                cat = { ...cat, ...body };
                result = cat;
            }
        });
        res.status(200).send({
            success: true,
            data: {
                cat: result,
            },
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// DELETE 고양이 데이터 삭제 -> DELETE
router.delete("/cats/:id", (req, res) => {
    try {
        const params = req.params;
        const newCat = Cat.filter((cat) => cat.id !== params.id);
        res.status(200).send({
            success: true,
            data: newCat,
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

export default router;
