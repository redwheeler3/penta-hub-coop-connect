import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const Apply = () => {
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [emailSignup, setEmailSignup] = useState("");
  const [formData, setFormData] = useState({
    // Section 1
    email: "",
    // Section 2
    applicantFirstName: "",
    applicantLastName: "",
    applicantAge: "",
    applicantPhone: "",
    applicantEmail: "",
    coApplicantFirstName: "",
    coApplicantLastName: "",
    coApplicantAge: "",
    coApplicantRelationship: "",
    coApplicantPhone: "",
    coApplicantEmail: "",
    childrenCount: "",
    // Section 4
    child1FirstName: "",
    child1LastName: "",
    child1Age: "",
    child2FirstName: "",
    child2LastName: "",
    child2Age: "",
    child3FirstName: "",
    child3LastName: "",
    child3Age: "",
    child4FirstName: "",
    child4LastName: "",
    child4Age: "",
    // Section 5
    streetAddress: "",
    streetAddress2: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    livedTwoYears: "",
    ownRealEstate: "",
    landlordName: "",
    landlordEmail: "",
    landlordPhone: "",
    // Section 6
    introduction: "",
    skills: "",
    coopExperience: "",
    whyCoopMember: "",
    photo: null as File | null,
    pets: "",
    // Section 7
    applicantJobTitle: "",
    applicantCompany: "",
    applicantStartDate: "",
    applicantManagerName: "",
    applicantManagerPhone: "",
    applicantManagerEmail: "",
    coApplicantJobTitle: "",
    coApplicantCompany: "",
    coApplicantStartDate: "",
    coApplicantManagerName: "",
    coApplicantManagerPhone: "",
    coApplicantManagerEmail: "",
    // Section 8
    applicantIncome: "",
    coApplicantIncome: "",
    householdIncome: "",
    // Section 9
    declaration: false
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentSection = () => {
    switch (currentSection) {
      case 1:
        return formData.email.trim() !== "";
      case 2:
        return (
          formData.applicantFirstName.trim() !== "" &&
          formData.applicantLastName.trim() !== "" &&
          formData.applicantAge.trim() !== "" &&
          formData.applicantPhone.trim() !== "" &&
          formData.applicantEmail.trim() !== "" &&
          formData.childrenCount !== ""
        );
      case 5:
        return (
          formData.streetAddress.trim() !== "" &&
          formData.city.trim() !== "" &&
          formData.country.trim() !== "" &&
          formData.livedTwoYears !== "" &&
          formData.ownRealEstate !== "" &&
          formData.landlordName.trim() !== "" &&
          formData.landlordEmail.trim() !== "" &&
          formData.landlordPhone.trim() !== ""
        );
      case 6:
        return (
          formData.introduction.trim() !== "" &&
          formData.skills.trim() !== "" &&
          formData.coopExperience.trim() !== "" &&
          formData.whyCoopMember.trim() !== ""
        );
      case 7:
        return (
          formData.applicantJobTitle.trim() !== "" &&
          formData.applicantCompany.trim() !== "" &&
          formData.applicantStartDate.trim() !== "" &&
          formData.applicantManagerName.trim() !== "" &&
          formData.applicantManagerPhone.trim() !== "" &&
          formData.applicantManagerEmail.trim() !== ""
        );
      case 8:
        return (
          formData.applicantIncome.trim() !== "" &&
          formData.householdIncome.trim() !== ""
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentSection()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }

    // Skip section 3 (rejection) for demo purposes
    if (currentSection === 2 && formData.childrenCount && (formData.childrenCount === "0" || formData.childrenCount === "More than 4")) {
      setCurrentSection(3);
    } else if (currentSection === 2 && formData.childrenCount && (formData.childrenCount === "1" || formData.childrenCount === "2" || formData.childrenCount === "3" || formData.childrenCount === "4")) {
      setCurrentSection(4); // Skip the rejection section and go directly to children details
    } else if (currentSection === 3) {
      setCurrentSection(4);
    } else {
      setCurrentSection(prev => Math.min(prev + 1, 9));
    }
  };

  const handlePrevious = () => {
    if (currentSection === 4 && (formData.childrenCount === "0" || formData.childrenCount === "More than 4")) {
      setCurrentSection(2);
    } else {
      setCurrentSection(prev => Math.max(prev - 1, 1));
    }
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your comprehensive application. We'll review it and get back to you soon.",
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you!",
      description: "We'll notify you when applications open again.",
    });
    setEmailSignup("");
  };

  const toggleApplicationStatus = () => {
    setApplicationsOpen(!applicationsOpen);
    toast({
      title: applicationsOpen ? "Applications Closed" : "Applications Opened",
      description: applicationsOpen ? "Now showing email signup form" : "Now showing application form",
    });
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Penta Co-operative Housing: Application For Membership</h3>
              <p className="text-gray-600 mb-4">
                Penta Co-operative Housing located near Jericho Beach in Vancouver is currently accepting applications 
                for a 2 bedroom unit with a monthly housing charge of $1,092. Move in date is September 1, 2024. 
                Applications will close on June 26, 2024.
              </p>
              <p className="text-gray-600 mb-4">
                By continuing, you declare that your household meets the size requirement of 1 or 2 adults PLUS 1 or more children under 18 years old.
              </p>
              <p className="text-gray-600 mb-4">
                If you are not interested in or eligible for the currently available unit but wish to be informed of future openings, 
                please do not continue this application. Instead, submit your email address to our mailing list at: 
                <a href="https://mailinglist.pentacoop.com" className="text-green-600 hover:underline ml-1">
                  https://mailinglist.pentacoop.com
                </a>
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">By continuing, you acknowledge the following:</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <strong>1. Personal Information Sharing:</strong>
                    <p>The personal information you provide to Penta may be made available to co-op auditor, lawyer, treasurer, directors, designated committee members, management company agents and staff, municipal employees (for Home Owner Grant applications), and general membership (only if relevant to an appeal).</p>
                  </div>
                  <div>
                    <strong>2. Information Usage:</strong>
                    <p>Penta may use the information to contact you, determine eligibility, conduct reference and credit checks, and decide on internal move requests.</p>
                  </div>
                  <div>
                    <strong>3. Information Retention:</strong>
                    <p>Personal information will be destroyed within 1 year (non-members) or 7 years (members) of application closing date.</p>
                  </div>
                  <div>
                    <strong>4. Privacy Rights:</strong>
                    <p>To view, correct, edit, or delete your personal information, contact the Privacy Officer at privacy@pentacoop.com. You will receive a response within 10 business days.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
              <p className="text-sm text-gray-600 mt-2">
                By entering my email address, I declare that I am eligible to apply for the unit being offered 
                and agree to the use of my personal information as outlined.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Applicant and co-applicant details</h3>
            
            <div>
              <h4 className="font-semibold mb-4">Applicant details</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicantFirstName">First name *</Label>
                  <Input
                    id="applicantFirstName"
                    value={formData.applicantFirstName}
                    onChange={(e) => handleInputChange("applicantFirstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantLastName">Last name *</Label>
                  <Input
                    id="applicantLastName"
                    value={formData.applicantLastName}
                    onChange={(e) => handleInputChange("applicantLastName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantAge">Age *</Label>
                  <Input
                    id="applicantAge"
                    type="number"
                    value={formData.applicantAge}
                    onChange={(e) => handleInputChange("applicantAge", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantPhone">Phone number (xxx-xxx-xxxx) *</Label>
                  <Input
                    id="applicantPhone"
                    value={formData.applicantPhone}
                    onChange={(e) => handleInputChange("applicantPhone", e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="applicantEmail">Email address *</Label>
                  <Input
                    id="applicantEmail"
                    type="email"
                    value={formData.applicantEmail}
                    onChange={(e) => handleInputChange("applicantEmail", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Co-applicant details, if applicable</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coApplicantFirstName">First name</Label>
                  <Input
                    id="coApplicantFirstName"
                    value={formData.coApplicantFirstName}
                    onChange={(e) => handleInputChange("coApplicantFirstName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantLastName">Last name</Label>
                  <Input
                    id="coApplicantLastName"
                    value={formData.coApplicantLastName}
                    onChange={(e) => handleInputChange("coApplicantLastName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantAge">Age</Label>
                  <Input
                    id="coApplicantAge"
                    type="number"
                    value={formData.coApplicantAge}
                    onChange={(e) => handleInputChange("coApplicantAge", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantRelationship">Relationship to applicant</Label>
                  <Input
                    id="coApplicantRelationship"
                    value={formData.coApplicantRelationship}
                    onChange={(e) => handleInputChange("coApplicantRelationship", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantPhone">Phone number (xxx-xxx-xxxx)</Label>
                  <Input
                    id="coApplicantPhone"
                    value={formData.coApplicantPhone}
                    onChange={(e) => handleInputChange("coApplicantPhone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantEmail">Email address</Label>
                  <Input
                    id="coApplicantEmail"
                    type="email"
                    value={formData.coApplicantEmail}
                    onChange={(e) => handleInputChange("coApplicantEmail", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">How many children (under 18) will be living in the unit on the move in date? *</Label>
              <RadioGroup value={formData.childrenCount} onValueChange={(value) => handleInputChange("childrenCount", value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="children0" />
                  <Label htmlFor="children0">0</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="children1" />
                  <Label htmlFor="children1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="children2" />
                  <Label htmlFor="children2">2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="children3" />
                  <Label htmlFor="children3">3</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="children4" />
                  <Label htmlFor="children4">4</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="More than 4" id="childrenMore" />
                  <Label htmlFor="childrenMore">More than 4</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <h3 className="text-lg font-semibold text-red-600">Sorry...</h3>
            <p className="text-gray-600">
              We are only accepting families with at least 1 child and at most 4 children for this unit. 
              We wish you the very best of luck in your housing search. Please consider signing up to our mailing list at{" "}
              <a href="https://mailinglist.pentacoop.com" className="text-green-600 hover:underline">
                https://mailinglist.pentacoop.com
              </a>{" "}
              to be notified when another unit becomes available.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Our unit size requirements are:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>1 bedroom: 1 or 2 adults</li>
                <li>2 bedroom: 1 or 2 adults PLUS 1 or more children under 18</li>
                <li>3 bedroom: 1 or 2 adults PLUS 2 or more children under 18</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Children</h3>
            <p className="text-gray-600">Please enter the details of any children that will be residing in the unit on the move in date.</p>
            
            {Array.from({ length: Math.min(parseInt(formData.childrenCount) || 0, 4) }, (_, index) => (
              <div key={index + 1} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-4">Child #{index + 1}</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the details of the {index === 0 ? "oldest" : index === 1 ? "second oldest" : index === 2 ? "third oldest" : "fourth oldest"} child
                  {index > 0 && ", if applicable"}
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`child${index + 1}FirstName`}>First name</Label>
                    <Input
                      id={`child${index + 1}FirstName`}
                      value={formData[`child${index + 1}FirstName` as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(`child${index + 1}FirstName`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`child${index + 1}LastName`}>Last name</Label>
                    <Input
                      id={`child${index + 1}LastName`}
                      value={formData[`child${index + 1}LastName` as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(`child${index + 1}LastName`, e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`child${index + 1}Age`}>Age</Label>
                    <Input
                      id={`child${index + 1}Age`}
                      type="number"
                      value={formData[`child${index + 1}Age` as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(`child${index + 1}Age`, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Current housing situation</h3>
            <p className="text-gray-600">Please tell us more about your current housing situation.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="streetAddress">Street address *</Label>
                <Input
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="streetAddress2">Street address 2</Label>
                <Input
                  id="streetAddress2"
                  value={formData.streetAddress2}
                  onChange={(e) => handleInputChange("streetAddress2", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="province">Province / State</Label>
                <Input
                  id="province"
                  value={formData.province}
                  onChange={(e) => handleInputChange("province", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal / Zip Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Have you lived at your current address for 2 years or more? *</Label>
              <RadioGroup value={formData.livedTwoYears} onValueChange={(value) => handleInputChange("livedTwoYears", value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="livedYes" />
                  <Label htmlFor="livedYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="livedNo" />
                  <Label htmlFor="livedNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">Do you own real estate (land, house, condominium, etc.)? *</Label>
              <RadioGroup value={formData.ownRealEstate} onValueChange={(value) => handleInputChange("ownRealEstate", value)} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="ownYes" />
                  <Label htmlFor="ownYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="ownNo" />
                  <Label htmlFor="ownNo">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Landlord information</h4>
              <p className="text-sm text-gray-600 mb-4">
                A reference check with your current landlord is required before you will be accepted as a member. 
                We will contact them only if you are selected for an interview. If you live in a house / condo / apartment 
                that you own, enter your own contact information below.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="landlordName">Current landlord name *</Label>
                  <Input
                    id="landlordName"
                    value={formData.landlordName}
                    onChange={(e) => handleInputChange("landlordName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="landlordEmail">Current landlord email address *</Label>
                  <Input
                    id="landlordEmail"
                    type="email"
                    value={formData.landlordEmail}
                    onChange={(e) => handleInputChange("landlordEmail", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="landlordPhone">Current landlord phone number (xxx-xxx-xxxx) *</Label>
                  <Input
                    id="landlordPhone"
                    value={formData.landlordPhone}
                    onChange={(e) => handleInputChange("landlordPhone", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Tell us more about you!</h3>
            <p className="text-gray-600">
              Members are required to share the responsibilities of operating and maintaining our Co-op. 
              As well as attending the Annual General Meeting (AGM) and any special general membership meetings called, 
              members must serve on one or more committees and attend all meetings called by the committee chairperson.
            </p>
            <p className="text-gray-600">
              An applicant's willingness to participate will be a decisive factor in the selection process.
            </p>
            <p className="text-gray-600 font-medium">
              We suggest taking time to write detailed answers to the questions below as it will drastically 
              increase your chances of a successful application.
            </p>

            <div>
              <h4 className="font-semibold mb-4">Required Questions</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="introduction">Please introduce yourself and your family, including your employment background, interests, and values. *</Label>
                  <Textarea
                    id="introduction"
                    value={formData.introduction}
                    onChange={(e) => handleInputChange("introduction", e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Please tell us about any skills you and the co-applicant could actively contribute to the running and maintenance of the co-op. *</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="coopExperience">Please tell us about any previous co-op experience you or the co-applicant may have. *</Label>
                  <Textarea
                    id="coopExperience"
                    value={formData.coopExperience}
                    onChange={(e) => handleInputChange("coopExperience", e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whyCoopMember">Describe why you want to live in a co-op and in what ways you would be a valuable member to the co-op. *</Label>
                  <Textarea
                    id="whyCoopMember"
                    value={formData.whyCoopMember}
                    onChange={(e) => handleInputChange("whyCoopMember", e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Optional Questions</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo">Upload a photo of yourself and the members of your household</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange("photo", e.target.files?.[0] || null)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {formData.photo && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {formData.photo.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="pets">If you have any pets, please describe them here.</Label>
                  <Textarea
                    id="pets"
                    value={formData.pets}
                    onChange={(e) => handleInputChange("pets", e.target.value)}
                    rows={3}
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    The Co-op has a pet policy allowing a household to own one dog and one cat, 
                    of a size and type subject to approval by the Board.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Employment information</h3>
            <p className="text-gray-600">
              A reference check with your current employer and the co-applicant's current employer (if applicable) 
              is required before you will be accepted as a member. We will contact them only if you are selected 
              for an interview. If you are self-employed, enter your own contact information below.
            </p>

            <div>
              <h4 className="font-semibold mb-4">Applicant</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicantJobTitle">Job title *</Label>
                  <Input
                    id="applicantJobTitle"
                    value={formData.applicantJobTitle}
                    onChange={(e) => handleInputChange("applicantJobTitle", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantCompany">Company name *</Label>
                  <Input
                    id="applicantCompany"
                    value={formData.applicantCompany}
                    onChange={(e) => handleInputChange("applicantCompany", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantStartDate">Start date at this company *</Label>
                  <Input
                    id="applicantStartDate"
                    type="date"
                    value={formData.applicantStartDate}
                    onChange={(e) => handleInputChange("applicantStartDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantManagerName">Name of current manager *</Label>
                  <Input
                    id="applicantManagerName"
                    value={formData.applicantManagerName}
                    onChange={(e) => handleInputChange("applicantManagerName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantManagerPhone">Phone number (xxx-xxx-xxxx) of current manager *</Label>
                  <Input
                    id="applicantManagerPhone"
                    value={formData.applicantManagerPhone}
                    onChange={(e) => handleInputChange("applicantManagerPhone", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="applicantManagerEmail">Email address of current manager *</Label>
                  <Input
                    id="applicantManagerEmail"
                    type="email"
                    value={formData.applicantManagerEmail}
                    onChange={(e) => handleInputChange("applicantManagerEmail", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Co-applicant</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coApplicantJobTitle">Job title</Label>
                  <Input
                    id="coApplicantJobTitle"
                    value={formData.coApplicantJobTitle}
                    onChange={(e) => handleInputChange("coApplicantJobTitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantCompany">Company name</Label>
                  <Input
                    id="coApplicantCompany"
                    value={formData.coApplicantCompany}
                    onChange={(e) => handleInputChange("coApplicantCompany", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantStartDate">Start date at this company</Label>
                  <Input
                    id="coApplicantStartDate"
                    type="date"
                    value={formData.coApplicantStartDate}
                    onChange={(e) => handleInputChange("coApplicantStartDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantManagerName">Name of current manager</Label>
                  <Input
                    id="coApplicantManagerName"
                    value={formData.coApplicantManagerName}
                    onChange={(e) => handleInputChange("coApplicantManagerName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantManagerPhone">Phone number (xxx-xxx-xxxx) of current manager</Label>
                  <Input
                    id="coApplicantManagerPhone"
                    value={formData.coApplicantManagerPhone}
                    onChange={(e) => handleInputChange("coApplicantManagerPhone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="coApplicantManagerEmail">Email address of current manager</Label>
                  <Input
                    id="coApplicantManagerEmail"
                    type="email"
                    value={formData.coApplicantManagerEmail}
                    onChange={(e) => handleInputChange("coApplicantManagerEmail", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Household income</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-4">
                Please provide a yearly before tax income (gross income) for the applicant, co-applicant, 
                and members of your household. Gross income includes all incoming funds such as:
              </p>
              <ul className="text-sm text-gray-600 list-disc ml-6 space-y-1">
                <li>Employment and self-employment</li>
                <li>Investments, including capital gains</li>
                <li>Social assistance, government benefits, and pension</li>
                <li>Support payments</li>
                <li>Rental income</li>
                <li>RRSP income</li>
              </ul>
              <p className="text-gray-600 mt-4">
                If you are called for an interview, all adult members of your household will be required 
                to provide the following proof of income:
              </p>
              <ul className="text-sm text-gray-600 list-disc ml-6 space-y-1 mt-2">
                <li>Current pay stub</li>
                <li>Most recent income tax assessment</li>
                <li>Letter from employer(s) indicating present salary</li>
              </ul>
              <p className="text-gray-600 mt-4">
                If shortlisted for the unit, our management company will carry out a credit check.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="applicantIncome">Total yearly gross income for applicant *</Label>
                <Input
                  id="applicantIncome"
                  type="number"
                  value={formData.applicantIncome}
                  onChange={(e) => handleInputChange("applicantIncome", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coApplicantIncome">Total yearly gross income for co-applicant</Label>
                <Input
                  id="coApplicantIncome"
                  type="number"
                  value={formData.coApplicantIncome}
                  onChange={(e) => handleInputChange("coApplicantIncome", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="householdIncome">Total yearly gross income for your household (add up all the numbers above) *</Label>
                <Input
                  id="householdIncome"
                  type="number"
                  value={formData.householdIncome}
                  onChange={(e) => handleInputChange("householdIncome", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Declaration</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4 text-sm text-gray-600">
              <p>I / We understand that a minimum of $1,000,000 Personal Property and Liability insurance is mandatory (insurance documents must be submitted to us in the first month of residency and annually thereafter).</p>
              <p>I / We understand that a share purchase of either $2,000 for a 1 bedroom unit, $3,500 for 2 bedroom unit, or $4,000 for a 3 bedroom unit is due at the time of approval. The first month's housing charge and arrangements for monthly housing charges will be made with our Management Company.</p>
              <p>I / We understand that references will be requested for shortlisted applicants.</p>
              <p>If accepted into membership, I / we agree to be bound by and comply with the Rules, Occupancy Agreement and Policies of the Co-op in force and as amended from time to time.</p>
              <p>I / We declare that all the information in this application is correct. I / We give the Co-op permission to verify any or all of this information, including and in addition to a landlord check, employment / income check, and credit check.</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="declaration"
                checked={formData.declaration}
                onCheckedChange={(checked) => handleInputChange("declaration", checked === true)}
              />
              <Label htmlFor="declaration" className="text-sm">
                I / We have read and agree to be bound by the conditions outlined above *
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Penta Housing Co-Op</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to be part of our community? {applicationsOpen ? "Applications are currently open!" : "Applications are currently closed, but you can join our waitlist."}
          </p>
          
          {/* Demo toggle button */}
          <Button 
            onClick={toggleApplicationStatus}
            variant="outline"
            className="mt-4 text-sm"
          >
            Demo: Toggle Application Status
          </Button>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {applicationsOpen ? `Membership Application - Section ${currentSection} of 9` : "Join Our Waitlist"}
            </CardTitle>
            <CardDescription>
              {applicationsOpen 
                ? "Complete all sections to submit your application."
                : "Get notified when applications open again."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applicationsOpen ? (
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                {renderSection()}
                
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentSection === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentSection < 9 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={currentSection === 3 && (formData.childrenCount === "0" || formData.childrenCount === "More than 4")}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!formData.declaration}
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email-signup">Email Address</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    value={emailSignup}
                    onChange={(e) => setEmailSignup(e.target.value)}
                    placeholder="Enter your email to get notified"
                    required
                  />
                </div>
                <p className="text-gray-600">
                  Applications are currently closed. Leave your email and we'll notify you 
                  as soon as they open again. We typically open applications quarterly.
                </p>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Join Waitlist
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apply;
