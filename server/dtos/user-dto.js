module.exports = class UserDto {
    role

    email
    fullName 
    city 
    cityzship 
    specional
    addressObject

    id
    isActivated



    phone

    allObject
    stage 

    infoText

    imageUrl

    bookmarksApp
    bookmarksFastApp
    bookmarksUser

    constructor(model){
        this.role = model.role

        this.email = model.email
        this.fullName = model.fullName
        this.city = model.city

        this.cityzship = model.cityzship
        this.specional = model.specional
        this.addressObject = model.addressObject

        this.id = model._id 
        this.isActivated = model.isActivated

        this.phone = model.phone
        this.allObject = model.allObject
        this.stage = model.stage
        this.infoText = model.infoText 

        this.imageUrl = model.imageUrl

        this.bookmarksApp = model.bookmarksApp
        this.bookmarksFastApp = model.bookmarksFastApp
        this.bookmarksUser = model.bookmarksUser
    }
}