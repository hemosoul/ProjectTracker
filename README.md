项目问题跟踪小助手(WeChat BugTracker MiniProgram)
=================
## 简介(Introduction)

本项目主要是用途跟踪项目上线前及上线后问题的跟踪和处理，提交的问题，问题发起人可以拍照及对问题进行描述，其他用户可以选择跟进，实现在手机上的电子化处理。
同时对项目的问题按照状态进行汇总统计。

## 基础框架(Framework)
项目前端使用微信小程序以及WEUI，后端使用微信小城寻的云函数，数据库和云存储，未另外架设服务器。后端的计费标准哟由微信收取，本项目不收取。

## 使用（Tutorial)
请将本项目下载至本地，然后使用微信开发者工具打开项目目录

*注意事项*：
- 请将环境ID设置成你自己的。
- 项目列表目前是由后台添加。

## 后台表结构(Database Structure)
表名：bugs

|  字段名   | 字段类型  | 描述 | 备注 |
|  ----  | ----  | ---  | ---  |
| _id  | string | 唯一标识符 | 自动生成 |
| title  | string | 问题标题  |  |
| detail  | string | 问题描述  |  |
| appendContent  | string | 问题补充说明  |  |
| created  | date | 创建事件  |  |
| prior  | string | 问题优先级  |  |
| projectID  | string | 对应项目ID  |  |
| status  | number | 问题标题  |  |
| userOpenID  | string | 用户openID  |  |

表名：users

|  字段名   | 字段类型  | 描述 | 备注 |
|  ----  | ----  | ---  | ---  |
| _id  | string | 唯一标识符 | 自动生成 |
| avatarUrl  | string | 用户图像链接  | 微信返回字段 |
| gender  | number | 性别标识  | 微信返回字段 |
| created  | date | 创建事件  |  |
| nickName  | string | 问题优先级  | 暂不支持修改 |
| openID  | string | openID值  |  |

表名：projects

|  字段名   | 字段类型  | 描述 | 备注 |
|  ----  | ----  | ---  | ---  |
| _id  | string | 唯一标识符 | 自动生成 |
| projectName  | string | 项目名称  |  |
| introduction  | string | 项目简介  |  |
| isPublic  | boolean | 项目是否公开  | 公开的项目，所有用户都可以访问。非公开项目，用户访问需要申请。 |
| creatorOpenID  | string | 创建者OpenID  |  |
| created  | date | 创建日期  |  |


## 特别感谢（Special Thanks)
本项目引用了[UUID的生成库](https://github.com/tangqipeng/uuid-js)，特别感谢，

## 项目许可 (License)

暂未定，目前请勿商用，署名原则使用。



