const dicts = [{
	"collection": "user",
    "children": [{
        "field": "sex",
        "children": [{
            "value": 0, "desc": "未知"
        }, {
            "value": 1, "desc": "男"
        }, {
            "value": 2, "desc": "女"
        }]
    }, {
        "field": "habit",
        "children": [{
            "value": 1, "desc": "跑步"
        }, {
            "value": 2, "desc": "游泳"
        }, {
            "value": 3, "desc": "瑜伽"
        }, {
            "value": 4, "desc": "音乐"
        }, {
            "value": 5, "desc": "电影"
        }, {
            "value": 6, "desc": "旅游"
        }, {
            "value": 7, "desc": "美食"
        }, {
            "value": 8, "desc": "购物"
        }, {
            "value": 9, "desc": "其他"
        }]
    }, {
        "field": "education",
        "children": [{
            "value": 0, "desc": "请选择"
        }, {
            "value": 1, "desc": "小学"
        }, {
            "value": 2, "desc": "初中"
        }, {
            "value": 3, "desc": "高中"
        }, {
            "value": 4, "desc": "大专"
        }, {
            "value": 5, "desc": "本科"
        }, {
            "value": 6, "desc": "硕士"
        }, {
            "value": 7, "desc": "博士"
        }]
    }, {
        "field": "job",
        "children": [{
            "value": 0, "desc": "请选择"
        }, {
            "value": 1, "desc": "服务业"
        }, {
            "value": 2, "desc": "建筑业"
        }, {
            "value": 3, "desc": "制造业"
        }, {
            "value": 4, "desc": "农业"
        }, {
            "value": 5, "desc": "纺织业"
        }, {
            "value": 6, "desc": "加工业"
        }, {
            "value": 7, "desc": "个体"
        }, {
            "value": 8, "desc": "IT"
        }]
    }, {
        "field": "income",
        "children": [{
            "value": 0, "desc": "请选择"
        }, {
            "value": 1, "desc": "10万以下"
        }, {
            "value": 2, "desc": "10万-20万"
        }, {
            "value": 3, "desc": "20万-50万"
        }, {
            "value": 4, "desc": "50万-100万"
        }, {
            "value": 5, "desc": "100万-500万"
        }, {
            "value": 6, "desc": "500万以上"
        }]
    }]
}]

/**
    获取字典集
    @param {String} collection 集合
    @param {String} field 字段
    @return {Array} 字典集
 */
const getDicts = (collection, field) => {
    let arr = []
    for (let i=0; i<dicts.length; i++) {
        const dict_collection = dicts[i]
        if (dict_collection.collection == collection) {
            for (let j=0; j<dict_collection.children.length; j++) {
                const dict_field = dict_collection.children[j]
                if (dict_field.field == field) {
                    for (let k=0; k<dict_field.children.length; k++) {
                        arr.push(dict_field.children[k])
                    }
                }
            }
        }
    }
    return arr
}

/**
    获取字典描述
    @param {String} collection 集合
    @param {String} field 字段
    @param {String} value 值
    @return {String} 字典描述
 */
const getDictDesc = (collection, field, value) => {
    for (let i=0; i<dicts.length; i++) {
        const dict_collection = dicts[i]
        if (dict_collection.collection == collection) {
            for (let j=0; j<dict_collection.children.length; j++) {
                const dict_field = dict_collection.children[j]
                if (dict_field.field == field) {
                    for (let k=0; k<dict_field.children.length; k++) {
                        const dict_value = dict_field.children[k]
                        if (dict_value.value == value) {
                            return dict_value.desc
                        }
                    }
                }
            }
        }
    }
    return ''
}

export {
    getDicts,
    getDictDesc
}
