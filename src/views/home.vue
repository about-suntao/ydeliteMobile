<template>
    <div class="apply">
        <div class="header">
            <img :src="img1" alt="" />
        </div>
        <div class="content">
            <div class="timeItem">
                <span class="active">
                    {{ timeItemData[activeState - 1].id }}
                </span>
                <p>
                    {{ timeItemData[activeState - 1].title }}
                </p>
            </div>
            <div class="content_form">
                <van-form @submit="onFirstSubmit" v-if="activeState === 1">
                    <van-field
                        v-model="ruleForm.name"
                        name="姓名"
                        label="姓名"
                        placeholder="姓名"
                        :rules="[{ required: true, message: '请输入姓名' }]"
                    />
                    <van-field
                        name="性别"
                        label="性别"
                        :rules="[{ required: true, message: '请选择性别' }]"
                    >
                        <template #input>
                            <van-radio-group
                                v-model="ruleForm.sex"
                                direction="horizontal"
                            >
                                <van-radio name="1">男</van-radio>
                                <van-radio name="2">女</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <van-field
                        v-model="ruleForm.phone"
                        name="手机号"
                        label="手机号"
                        placeholder="请输入手机号"
                        type="number"
                        :rules="[
                            {
                                required: true,
                                validator: phoneValidator,
                                message: '请输入手机号',
                            },
                        ]"
                    />

                    <van-field
                        v-model="ruleForm.email"
                        name="电子邮箱"
                        label="电子邮箱"
                        placeholder="请输入电子邮箱"
                        :rules="[
                            {
                                required: true,
                                validator: mailValidator,
                                message: '请输入电子邮箱',
                            },
                        ]"
                    />

                    <van-field
                        v-model="ruleForm.idCard"
                        name="证件号码"
                        label="证件号码"
                        placeholder="请输入证件号码"
                        :rules="[{ required: true, message: '请输入证件号码' }]"
                    />
                    <van-field
                        v-model="ruleForm.birthday"
                        is-link
                        readonly
                        name="生日"
                        label="生日"
                        placeholder="请选择生日"
                        @click="showPicker.birthday = true"
                        :rules="[{ required: true, message: '请选择生日' }]"
                    />
                    <van-popup
                        v-model:show="showPicker.birthday"
                        position="bottom"
                    >
                        <van-date-picker
                            @confirm="onBirthdayConfirm"
                            @cancel="showPicker.birthday = false"
                            :min-date="minDate"
                        />
                    </van-popup>

                    <van-field
                        v-model="ruleForm.juniorHighSchool"
                        name="初中学校"
                        label="初中学校"
                        placeholder="初中学校"
                        :rules="[
                            { required: true, message: '请输入初中就读学校' },
                        ]"
                    />

                    <van-field
                        v-model="ruleForm.grade"
                        is-link
                        readonly
                        name="年级"
                        label="年级"
                        placeholder="选择年级"
                        @click="showPicker.grade = true"
                        :rules="[{ required: true, message: '请选择年级' }]"
                    />
                    <van-popup
                        v-model:show="showPicker.grade"
                        position="bottom"
                    >
                        <van-picker
                            :columns="gradeColumns"
                            @confirm="onGradeConfirm"
                            @cancel="showPicker.grade = false"
                        />
                    </van-popup>

                    <van-field
                        v-model="ruleForm.access"
                        is-link
                        readonly
                        name="获取途径"
                        label="获取途径"
                        placeholder="获取途径"
                        @click="showPicker.access = true"
                        :rules="[{ required: true, message: '请选择获取途径' }]"
                    />
                    <van-popup
                        v-model:show="showPicker.access"
                        position="bottom"
                    >
                        <van-picker
                            :columns="accessColumns"
                            @confirm="onAccessConfirm"
                            @cancel="showPicker.access = false"
                        />
                    </van-popup>

                    <van-field
                        name="uploader"
                        label="身份证正面"
                        :rules="[
                            {
                                required: true,
                                validator: photoValidator,
                                message: '请上传身份证正面照片',
                            },
                        ]"
                    >
                        <template #input>
                            <van-uploader
                                v-model="fileFrontList"
                                :max-count="1"
                                :after-read="upLoadFront"
                            />
                        </template>
                    </van-field>

                    <div class="btn">
                        <van-button
                            round
                            block
                            type="primary"
                            native-type="submit"
                        >
                            下一步
                        </van-button>
                    </div>
                </van-form>

                <van-form @submit="onSubmit" v-if="activeState === 2">
                    <van-field
                        v-model="ruleForm.interest"
                        name="兴趣爱好"
                        label="兴趣爱好"
                        type="textarea"
                        rows="5"
                        placeholder="阅读/运动/音乐/绘画/手工艺"
                        :rules="[{ required: true, message: '请输入兴趣爱好' }]"
                    />
                    <van-field
                        v-model="ruleForm.awards"
                        name="获奖情况"
                        label="获奖情况"
                        type="textarea"
                        rows="5"
                        placeholder="××年国家/省级市级××奖项"
                        :rules="[{ required: true, message: '请输入获奖情况' }]"
                    />
                    <van-field
                        v-model="ruleForm.practice"
                        name="社会实践"
                        label="社会实践"
                        type="textarea"
                        rows="5"
                        placeholder="环保工作/志愿服务/调查活动"
                        :rules="[
                            { required: true, message: '请输入社会实践经历' },
                        ]"
                    />
                    <div class="btn">
                        <van-button
                            round
                            block
                            type="primary"
                            native-type="submit"
                            @click="activeState = 1"
                        >
                            上一步
                        </van-button>
                        <van-button
                            round
                            block
                            type="primary"
                            native-type="submit"
                        >
                            提交
                        </van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import getAssetsFile from '../util/getAssetsFile'
    import { showNotify } from 'vant'
    import { useRouter } from 'vue-router'

    import { submitForm } from './homeApi'
    import upLoadFile from '../axios/api'

    const router = useRouter()

    const img1 = getAssetsFile('logo.png')

    const minDate = ref(new Date(1937, 1, 31))

    const timeItemData = [
        {
            id: 1,
            title: '填写个人信息',
        },
        {
            id: 2,
            title: '自我评价',
        },
    ]

    const activeState = ref(1)

    const contactActive = ref(0)

    const fileFrontList = ref([])
    const fileBackList = ref([])

    const ruleForm = reactive({
        name: '',
        sex: '',
        idCard: '',
        idfrontSide: '',
        phone: '',
        email: '',
        birthday: '',
        juniorHighSchool: '',
        access: '',
        grade: '',
        interest: '',
        awards: '',
        practice: '',
    })

    const gradeColumns = [
        { text: '初二', value: 'second_grade' },
        { text: '初三', value: 'three_grade' },
    ]

    const accessColumns = [
        { text: '网络', value: 'Internet' },
        { text: '宣讲会/讲座', value: 'CareerTalk' },
        { text: '教育择校展', value: 'selectSchool' },
        { text: '熟人介绍', value: 'friend' },
        { text: '其他', value: 'other' },
    ]

    const contact_relationColumns = [
        { text: '父亲', value: 'father' },
        { text: '母亲', value: 'mother' },
        { text: '其他', value: 'other' },
    ]

    const phoneValidator = (val) => {
        const reg_tel =
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!reg_tel.test(val)) {
            return '请正确填写您的手机号码！'
        }
    }

    const mailValidator = (val) => {
        const reg_tel = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!reg_tel.test(val)) {
            return '请正确填写您的邮箱！'
        }
    }

    const photoValidator = (file) => {
        if (file[0].status != 'done') {
            return '图片尚未上传成功'
        }
    }

    const showPicker = reactive({
        birthday: false,
        grade: false,
        access: false,
        contact_relation: false,
    })

    const onBirthdayConfirm = ({ selectedValues }) => {
        ruleForm.birthday = selectedValues.join('/')
        showPicker.birthday = false
    }

    const onGradeConfirm = ({ selectedOptions }) => {
        ruleForm.grade = selectedOptions[0]?.text
        showPicker.grade = false
    }
    const onAccessConfirm = ({ selectedOptions }) => {
        ruleForm.access = selectedOptions[0]?.text
        showPicker.access = false
    }

    const OpencontactPopup = (index) => {
        showPicker.contact_relation = true
        contactActive.value = index
    }

    const oncontactConfirm = ({ selectedOptions }) => {
        ruleForm.contact[contactActive.value].relation =
            selectedOptions[0]?.text
        showPicker.contact_relation = false
    }

    // 上传图片
    const postImg = async (formData, cb) => {
        const res = await upLoadFile(formData)
        cb(res)
    }

    //图片上传
    const upLoadFront = (file) => {
        file.status = 'uploading'
        file.message = '上传中'
        let fileUrl = file.file
        let formData = new FormData()
        formData.append('file', fileUrl)
        postImg(formData, (res) => {
            if (res.data.code === 200) {
                file.url = res.data.data.url
                ruleForm.idfrontSide = res.data.data.url
                file.status = 'done'
                file.message = '上传成功'
            } else {
                file.status = 'failed'
                file.message = '上传失败'
            }
        })
    }

    const onFirstSubmit = () => {
        activeState.value = 2
    }

    const onSubmit = () => {
        submitForm(ruleForm).then((res) => {
            if (res.data.code === 200) {
                router.push('/success')
            } else {
                showNotify({
                    type: 'warning',
                    color: 'white',
                    style: ' background-color: #FF976A;text-align:center;font-size:16px;padding:10px 0',
                    message: '信息提交错误，请重试!',
                })
            }
        })
    }
</script>

<style scoped lang="scss">
    .cc {
        width: 100%;
        height: 100%;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .apply {
        .header {
            background-color: #fff;
            box-shadow: 0 2px 4px #e5e5e580;
            height: 60px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;

            img {
                width: 300px;
                height: auto;
            }
        }
        .content {
            margin-top: 20px;
            padding: 20px 0;
            width: 100%;
            background-color: #fff;
            box-shadow: 0 2px 4px #e5e5e580;
            border-radius: 10px;
            .timeItem {
                display: flex;
                align-items: center;
                justify-content: center;
                .active {
                    width: 20px;
                    height: 20px;
                    font-size: 18px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #1890ff;
                    border-radius: 50%;
                    color: white;
                }
                p {
                    margin: 0 10px;
                    font-size: 18px;
                    font-weight: bold;
                }
            }

            .content_form {
                padding-top: 20px;
                padding-left: 20px;
                .van-field {
                    margin-bottom: 10px;
                }
                .van-button {
                    margin-top: 30px;
                    margin-bottom: 50px;
                }

                .smallTitle {
                    width: 100%;
                    padding: 30px 0 15px 0;
                    p {
                        font-size: 15px;
                    }
                }

                .btn {
                    display: flex;
                    justify-content: center;
                    .van-button {
                        width: 30%;
                    }
                    .van-button + .van-button {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
</style>
