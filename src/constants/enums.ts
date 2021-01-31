enum LanguageLevel {
    beginner = 'beginner',
    elementary = 'elementary',
    intermediate = 'intermediate',
}

enum Permissions {
    blocked = 'blocked',
    active = 'active'
}

enum TaskTypes {
    test = 'test',
    audio = 'audio',
    matching = 'matching'
}

enum UserRoles {
    admin = 'admin',
    student = 'student',
    teacher = 'teacher'
}

export {
    LanguageLevel,
    Permissions,
    UserRoles,
    TaskTypes,
}